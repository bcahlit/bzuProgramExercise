#include <iostream>
#include <string.h>
using namespace std;
int main()
{
    string sign, value, output="";
    cin>>sign>>value;
    int len=value.length();
    if(sign.length()==len){
        for(int i=0;i<len;i++){
            if(value[i]=='1') output+="\\neg ";
            output+=sign[i];
            if(i!=len-1)output+="\\vee ";
        }
        cout<<output;
    }else{
        cout<<"输入值不匹配"<<endl;
    }
}
