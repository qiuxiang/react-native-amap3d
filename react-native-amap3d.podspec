require 'json'

package = JSON.parse(File.read(File.join(__dir__, 'package.json')))

Pod::Spec.new do |s|
  s.name         = "react-native-amap3d"
  s.version      = package['version']
  s.summary      = "React Native AMap3D component for iOS"

  s.authors      = { "qiuxiang" => "i@7c00.cc" }
  s.homepage     = "https://github.com/qiuxiang/react-native-amap3d"
  s.license      = "MIT"
  s.platform     = :ios, "8.0"

  s.source       = { :git => "https://github.com/qiuxiang/react-native-amap3d.git" }
  s.source_files  = "ios/**/*.{h,m}"

  s.dependency 'React'
  s.dependency 'AMap3DMap'
end
