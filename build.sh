#!/bin/bash

# 删除已存在的zip文件
rm -f nga-plus.zip

# 创建新的zip文件，排除.git相关文件和其他zip文件
zip -r nga-plus.zip . -x "*.git*" "*.zip" "build.sh"

echo "Package created: nga-plus.zip"