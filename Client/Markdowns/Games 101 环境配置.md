# Linux安装Eigen 3
## 下载
[下载地址](https://gitlab.com/libeigen/eigen/-/tree/master)  
git clone 下载到本地
## 安装
打开下载路径
```
mkdir build
cd build
cmake ..
sudo make install
```
安装后文件路径 usr/local/include/eigen3
## 测试
`vim eigentest.cpp`
```
#include <iostream>
#include <eigen3/Eigen/Dense>
using Eigen::MatrixXd;

int main()
{
	MatrixXd m(2,2);
	m(0,0) = 3;
	m(1,0) = 2.5;
	m(0,1) = -1;
	m(1,1) = m(1,0) + m(0,1);
	std::cout << m << std::endl;
}
```
运行

`g++ *.cpp -o app`  
`./app` 
 
输出：
```
3   -1
2.5 1.5
```
## 查看版本号
`vim /usr/local/include/eigen3/Eigen/src/Core/util/Macros.h`
```
#define EIGEN_WORLD_VERSION 3
#define EIGEN_MAJOR_VERSION 4
#define EIGEN_MINOR_VERSION 90
```
版本为3.4.90  
  
`pkg-config --modversion eigen3`  
可查看版本号，需安装pkg-config
## 卸载
`apt-get install mlocate`  
安装mlocate  
`sudo updatedb`  
`locate eigen3`  
查看eigen3位置  
`sudo rm -rf eigen3路径`  
删除相关文件  
# Linux下安装OpenCV
## 安装
```
sudo apt-get install build-essential libgtk2.0-dev libgtk-3-dev libavcodec-dev libavformat-dev libjpeg-dev libswscale-dev libtiff5-dev
```  
先安装依赖库  
[OpenCV Get Started](https://opencv.org/get-started/)  
**Operating System:**  
Linux  
**Building From Source:**  
Yes  
**Language:**  
C++  
[OpenCV安装参考 C++](https://docs.opencv.org/4.8.0/d7/d9f/tutorial_linux_install.html)  
```
cmake -DOPENCV_EXTRA_MODULES_PATH=../opencv_contrib-4.x/modules ../opencv-4.x -D OPENCV_GENERATE_PKGCONFIG=YES -D CMAKE_BUILD_TYPE=Release
```
`-D CMAKE_BUILD_TYPE=Release`  
此条为可选项，如果不添加，cmake默认使用Release  
最后不要忘记`sudo make install`
## 查看版本号
`opencv_version`
## 测试
```
#include <iostream>
#include <opencv2/core.hpp>
#include <opencv2/highgui.hpp>
using namespace cv;
using namespace std;
int main(int argc, char** argv )
{
        Mat image;
        image = imread( argv[1], 1 );
        imshow("Display Image", image);
        waitKey(0);
        return 0;
}
```
main.cpp  
```
cmake_minimum_required(VERSION 3.0)
project(ImageShow)
find_package(OpenCV REQUIRED)
add_executable(ImageShow main.cpp)
target_link_libraries(ImageShow PRIVATE ${OpenCV_LIBS})
```
CMakeLists.txt  
```
mkdir build
cd build
cmake ..
make
./ImageShow image.jpg
```
将image.jpg放到build目录下
