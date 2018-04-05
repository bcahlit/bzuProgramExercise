#include <iostream>
#include <string.h>
#include <math.h>
using namespace std;

class Binclass //Binclass 二进制类,可以输入二进制字符串 对其值进行修改,然后输出 二进制的字符串
{
  public:
    int value;//保存其真实的十进制值
    int len;//其二进制长度 在将数值转化二进制字符串时  为字符串添加多余的0
    string to_s(void)// 输出二进制的字符串
    {
        string buff = "";
        int tem = value;
        for (; tem > 0; tem /= 2)
        {
            if (tem % 2 == 1)
                buff = "1" + buff;
            else
                buff = "0" + buff;
        }
        for (int i = buff.length(); i < len; i++)
        {
            buff = "0" + buff;
        }
        return buff;
    }
    Binclass operator++(int i)//定义 ++运算符 在for循环中使用
    {
        value++;
        return Binclass(value, len);
    }
    bool operator>(Binclass other) //定义 ">" 运算符 在for循环中使用
    {
        return this->value > other.value;
    }
    bool operator<(Binclass other)
    {
        return this->value < other.value;
    }
    Binclass(string raw) // 这是构造函数
    {
        value = 0;
        len = raw.length();
        int weight = 1;
        for (int i = len - 1; i >= 0; i--)
        {
            if (raw[i] == '1')
                value += weight;
            weight *= 2;
        }
    }
    Binclass(int raw, int leng) // 这是构造函数
    {
        value = raw;
        len = leng;
    }
};

string genitem(string sign, string value, string conn, char flag) //生成极小项或者极大项 通过 conn 与 flag来确定是极大项还是极小项.
{
    string output = "";
    int len = value.length();
    for (int i = 0; i < len; i++)
    {
        if (value[i] == flag)
            output += "\\neg ";
        output += sign[i];
        if (i != len - 1)
            output += conn;
    }
    return output;
}

int main()
{
    string Extract = "", Combine = "", sign, value;
    int itemNum, len;
    
    char Type;
    cin >> sign >> itemNum >> Type;
    len = sign.length();
    Binclass begin = Binclass(0, len);
    Binclass end = Binclass(pow(2, len), len);
    for (int i = 0; i < itemNum; i++)
    {
        cin >> value;
        Binclass latterEnd = Binclass(value);
        for (; begin < latterEnd; begin++)
        {
            if (Type == 'M')
                Extract += "(" + genitem(sign, begin.to_s(), "\\wedge ", '0') + ")\\vee ";
            if (Type == 'm')
                Combine += "(" + genitem(sign, begin.to_s(), "\\vee ", '1') + ")\\wedge ";
        }
        if (Type == 'M')
            Combine += "(" + genitem(sign, begin.to_s(), "\\vee ", '1') + ")\\wedge ";
        if (Type == 'm')
            Extract += "(" + genitem(sign, begin.to_s(), "\\wedge ", '0') + ")\\vee ";
        begin++;
    }
    for (; begin < end; begin++)
    {
        if (Type == 'M')
            Extract += "(" + genitem(sign, begin.to_s(), "\\wedge ", '0') + ")\\vee ";
        if (Type == 'm')
            Combine += "(" + genitem(sign, begin.to_s(), "\\vee ", '1') + ")\\wedge ";
    }
    if(Combine.length()>0)cout << Combine.substr(0,Combine.length()-7) << endl;
    else cout<<"NULL"<<endl;
    if(Extract.length()>0)cout << Extract.substr(0,Extract.length()-5) << endl;
    else cout<<"NULL"<<endl;
    return 0;
}
