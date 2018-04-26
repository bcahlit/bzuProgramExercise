#include <iostream>
#include <string.h>
using namespace std;
long lcm(long n, long m){
    long r;
    long mul;
    mul = n * m;
    while (n != 0)
    {
        r = m % n;
        m = n;
        n = r;
    }
    return mul / m;
}
int main(){
    long n,*a;
    int m;
    long num=0;
    cin>>n>>m;
    a=new long[m];
    for(int i=0;i<m;i++)cin>>a[i];
    for(int i=1;i<1<<m;i++){
        int sign=0;//记录当前生成的排列的项的数决定它的符号
        int tem_i=i;//保存下 i 对其进行操作
        long currentLcm=1;
        for(int j=0;tem_i;j++,tem_i>>=1){
            if(tem_i%2==1){
                sign++;
                currentLcm=lcm(currentLcm,a[j]);
                if(currentLcm>n)break;
            }
        }
        // if(n/currentLcm==1)cout<<"n:"<<n<<" Lcm:"<<currentLcm<<" //"<<n/currentLcm<<endl;
        sign%2==1?num+=n/currentLcm: num-=n/currentLcm;
    }
    cout<<num;
    return 0;
}
