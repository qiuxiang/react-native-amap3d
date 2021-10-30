require "json"

package = JSON.parse(File.read(File.join(__dir__, "../../package.json")))

Pod::Spec.new do |s|
  s.name         = "react-native-amap3d"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.homepage     = package["homepage"]
  s.license      = package["license"]
  s.authors      = package["author"]

  s.platforms    = { :ios => "10.0" }
  s.source       = { :git => "https://github.com/qiuxiang/react-native-amap3d.git", :tag => "#{s.version}" }

  s.source_files = "**/*.{h,m,mm,swift}"

  s.dependency "React-Core"
  s.dependency 'AMap3DMap', "~> 8.0.1"
end
