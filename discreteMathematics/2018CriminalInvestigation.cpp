#include <iostream>
#include <string.h>
#include <math.h>
#include "time.h"
using namespace std;

class Fourclass //Fourclass 二进制类,可以输入二进制字符串 对其值进行修改,然后输出 二进制的字符串
{
  public:
    int value; //保存其真实的十进制值
    int len;   //其四进制长度 在将数值转化二进制字符串时  为字符串添加多余的0
    int *buff;
    int *to_intArray(void) // 输出四进制的字符串
    {
        int tem = value;
        int i = 0;
        for (; tem > 0; tem /= 4)
        {
            buff[i++] = tem % 4;
        }
        return buff;
    }
    Fourclass operator++(int i) //定义 ++运算符 在for循环中使用
    {
        value++;
        return Fourclass(value, len);
    }
    bool operator>(Fourclass other) //定义 ">" 运算符 在for循环中使用
    {
        return this->value > other.value;
    }
    bool operator<(Fourclass other)
    {
        return this->value < other.value;
    }
    Fourclass(int raw, int leng) // 这是构造函数
    {
        buff = new int[10]{0,0,0,0,0,0,0,0,0,0};
        value = raw;
        len = leng;
    }
};

int main()
{
    double  start, finish;
    Fourclass begin = Fourclass(0, 10);
    Fourclass end = Fourclass(pow(4, 10), 11);
    int *a;
    int select[4] = {0, 0, 0, 0};
    int min = 10, max = 0;
    for (; begin < end; begin++)
    {
        a = begin.to_intArray();
        min = 10, max = 0;
        for (int i = 0; i < 4; i++)
            select[i] = 0;
        for (int i = 0; i < 10; i++)
            select[a[i]]++;
        for (int i = 0; i < 4; i++)
        {
            min = select[i] < min ? select[i] : min;
            max = select[i] > max ? select[i] : max;
        }
        if ((a[1] == 0 && a[4] == 2 || a[1] == 1 && a[4] == 3 || a[1] == 2 && a[4] == 0 || a[1] == 3 && a[4] == 1) &&
            (a[2] == 0 && a[2] != a[5] && a[2] != a[1] && a[2] != a[3] ||
             a[2] == 1 && a[5] != a[2] && a[5] != a[1] && a[5] != a[3] ||
             a[2] == 2 && a[1] != a[2] && a[1] != a[5] && a[1] != a[3] ||
             a[2] == 3 && a[3] != a[2] && a[3] != a[5] && a[3] != a[1]) &&
            (a[3] == 0 && a[0] == a[4] || a[3] == 1 && a[1] == a[6] || a[3] == 2 && a[0] == a[8] || a[3] == 3 && a[6] == a[9]) &&
            (a[4] == 0 && a[7] == 0 || a[4] == 1 && a[3] == 1 || a[4] == 2 && a[8] == 2 || a[4] == 3 && a[6] == 3) &&
            (a[5] == 0 && a[1] == a[7] && a[3] == a[7] ||
             a[5] == 1 && a[0] == a[7] && a[5] == a[7] ||
             a[5] == 2 && a[2] == a[7] && a[9] == a[7] ||
             a[5] == 3 && a[4] == a[7] && a[8] == a[7]) &&
            (a[6] == 0 && select[2] < select[0] && select[2] < select[1] && select[2] < select[3] ||
             a[6] == 1 && select[1] < select[0] && select[1] < select[2] && select[1] < select[3] ||
             a[6] == 2 && select[0] < select[1] && select[0] < select[2] && select[0] < select[3] ||
             a[6] == 3 && select[3] < select[0] && select[3] < select[1] && select[3] < select[2]) &&
            (a[7] == 0 && abs(a[0] - a[6]) > 1 ||
             a[7] == 1 && abs(a[0] - a[4]) > 1 ||
             a[7] == 2 && abs(a[0] - a[1]) > 1 ||
             a[7] == 3 && abs(a[0] - a[9]) > 1) &&
            (a[8] == 0 && (a[0] == a[5]) != (a[5] == a[4]) ||
             a[8] == 1 && (a[0] == a[5]) != (a[9] == a[4]) ||
             a[8] == 2 && (a[0] == a[5]) != (a[1] == a[4]) ||
             a[8] == 3 && (a[0] == a[5]) != (a[8] == a[4])) &&
            (a[9] == 0 && max - min == 3 || a[9] == 1 && max - min == 2 || a[9] == 2 && max - min == 4 || a[9] == 3 && max - min == 1))
        {
            for (int i = 0; i < 10; i++)
                cout << (char)(a[i] + 'A');
                break;
        }
    }
}