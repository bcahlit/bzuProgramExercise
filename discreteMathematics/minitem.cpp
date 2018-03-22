#include <iostream>
#include <string.h>
using namespace std;
int main()
{
    string sign, value, output="";//sign:输入的符号 value:输入的数值 output:暂存输出的内容
    cin>>sign>>value;// 输入内容
    int len=value.length(); //保存长度
    if(sign.length()==len){ //如果输入的符号与数值的长度匹配
        for(int i=0;i<len;i++){ //对每个字符进行处理
            if(value[i]=='0') output+="\\neg ";//如果当前的值为0 要在当前符号之前加非(\neg )号
            output+=sign[i];//添加当前符号
            if(i!=len-1)output+="\\wedge ";//如果当前不是最后一个元素就添加合取号 (最后一个元素之后不需要添加合取或析取号)
        }
        cout<<output;//输出最后的值
    }else{
        cout<<"输入值不匹配"<<endl;
    }
}
