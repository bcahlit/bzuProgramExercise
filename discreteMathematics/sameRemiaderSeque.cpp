#include <iostream>
#include <map>
using namespace std;
int main()
{
    map<int, int> Remaiade;
    map<int, int>::iterator iter;
    int N,K,preRem,j,num;
    Remaiade.insert(map<int, int>::value_type(0, 1));
    preRem=num=0;
    cin>>N>>K;
    for(int i=0;i<N;i++){
        cin>>j;
        preRem=(preRem+j)%K;
        iter=Remaiade.find(preRem);
        if(iter!=Remaiade.end()){
            num+=iter->second;
            iter->second++;
        }else{
            Remaiade.insert(map<int, int>::value_type(preRem, 1));
        }
    }
    cout<<num<<endl;
    return 0;
}
