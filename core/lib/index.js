#!/usr/bin/env node

const spawn = require('cross-spawn')
const path = require('path')
const fs = require('fs')
const cmd = process.argv[2]

const ROOTPATH = process.cwd() // 项目根目录
const srcPath = path.join(__dirname, '..', 'src', 'index.js') // core/src/index.js
const targetPath = path.join(ROOTPATH, '.llfe', 'start.js') // .llfe/start.js

// 删除目录或文件
const rmDirOrFile = _p => {
  if (fs.existsSync(_p)) {
    if (fs.statSync(_p).isFile()) fs.unlinkSync(_p)
    else {
      let _list = fs.readdirSync(_p)
      for (_pn of _list) {
        if (fs.statSync(path.join(_p, _pn)).isFile())
          fs.unlinkSync(path.join(_p, _pn))
        else {
          rmDir(path.join(_p, _pn))
        }
      }
      fs.rmdirSync(_p)
    }
  }
}

rmDirOrFile(path.join(ROOTPATH, '.llfe')) // 删除.llfe文件夹
fs.mkdirSync(path.join(ROOTPATH, '.llfe')) // 创建 .llfe文件夹
const content = fs.readFileSync(srcPath) // copy 文件
fs.writeFileSync(targetPath, content)

if (cmd == 'dev') {
  const child = spawn('node', [targetPath], {
    stdio: 'inherit'
  })
  return
}
if (cmd == 'build') {
  const child = spawn('sh', [path.join(__dirname, 'build'), ROOTPATH], {
    stdio: 'inherit'
  })
}
if (cmd == 'start') {
  spawn('sh', [path.join(__dirname, 'start'), ROOTPATH, targetPath], {
    stdio: 'inherit'
  })
}
// const child = spawn('node_modules/.bin/next', [cmd, './client'], {
//   stdio: 'inherit'
// })

// todo
// 将src/index.js 文件复制到项目目录下，通过cross-spawn运行
// 此文件仅作为命令交互（传递）脚本
// cli？
