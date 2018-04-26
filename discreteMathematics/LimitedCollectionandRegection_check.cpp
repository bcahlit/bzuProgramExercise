#include <iostream>
#include <string.h>
#include <math.h>
using namespace std;

int main(){
    long n,*a;
    int m;
    long num=0;
    cin>>n>>m;
    a=new long[m];
    for(int i=0;i<m;i++)cin>>a[i];
    for(long i=1;i<=n;i++){
        for(int j=0;j<m;j++){
            if(i%a[j]==0){
                num++;
                break;
            }
        }
    }
    cout<<num;
    return 0;
}
