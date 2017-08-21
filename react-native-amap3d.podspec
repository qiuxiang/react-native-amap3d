require 'json'

package = JSON.parse(File.read(File.join(__dir__, 'package.json')))

Pod::Spec.new do |s|
  s.name         = package['name']
  s.version      = package['version']
  s.summary      = package['description']

  s.authors      = { "Qiu Xiang" => "i@7c00.cc" }
  s.homepage     = 'https://github.com/qiuxiang/react-native-amap3d#readme'
  s.license      = package['license']
  s.platform     = :ios, "8.0"

  s.source       = { :git => 'https://github.com/qiuxiang/react-native-amap3d.git' }
  s.source_files = 'ios/**/*.{h,m}'

  s.dependency 'React'
  s.dependency 'AMapNavi'
end
