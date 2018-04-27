#include <chrono>
#include <thread>
#include <random>
#include<iostream>
 
using namespace std;
 
int hash_al_wstaw(int* tablica, int rozmiar, int x)
{
        for (int i = 0; i < rozmiar ; i++)
        {
                int k = ((x % rozmiar) + i)%rozmiar;
                if (tablica[k] == -1 )
                {
                        tablica[k] = x;
                        return i+1;
                }
 
        }
        return 0;
}
int losowa_liczba(int min = 0, int max = std::numeric_limits<int>::max())
{
        static std::default_random_engine gen(std::random_device{}());
        static std::uniform_int_distribution<int> dist;
        return dist(gen, std::uniform_int_distribution<int>::param_type{ min, max });
 
}
 
 
void eksperyment(int* tablica, int* tablos, int n)
{
        int x = 0;
        int suma = 0;
        int k = 0;
        for (int i = 0; i < 10; i++)
        {
                if (i != 0)
                {
                        for (int j = 0; j <90000; j++)
                        {
                                hash_al_wstaw(tablica, n, losowa_liczba(0, INT_MAX));
                        }
                }
 
                
                auto start = std::chrono::high_resolution_clock::now();
                for (int l = 0; l < 10000; l++)
                {
                        x=hash_al_wstaw(tablica, n, tablos[l+(k/10)]);
                        suma += x;
                }
                auto end = std::chrono::high_resolution_clock::now();
                std::chrono::duration<double, std::micro> duration = end - start;
                cerr << " Dla zapelnienia: "<<i*10<<" % " << "Uplynelo: " << duration.count()/10000 <<"us"<<" Liczba prob "<< double(suma)/10000<<"\n";
                k += 10000;
                suma = 0;
        }
}
 
int main()
{
        const int r = 1000000;
        int* tab = new int[r];
        for (int i = 0; i < r; i++)
                tab[i] = -1;
        const int rozmlso = 100000;
        int tablosowe[rozmlso];
        for (int i = 0; i < rozmlso; i++)
                tablosowe[i] = losowa_liczba(0, INT_MAX);
        eksperyment(tab, tablosowe, r);
 
 
 
        return 0;
}

/////////////////////////////////////////////////
#include <iostream>
#include <chrono>
#include <thread>
#include <random>

using namespace std;

int h(int x, int i, int rozmiar)
{
	int j = 0;
	if (i == 0)
	{
		j = x%rozmiar;
	}
	else if(i != 0)
	{
		j = ((x%rozmiar) + i) % rozmiar;
	}
	return j;
}

bool hash_al_wstaw(int x,int* tab, int rozmiar)
{
	for (int i = 0; i < rozmiar; i++)
	{
		int k = h(x, i, rozmiar);
		if (tab[k] == -1)
		{
			tab[k] = x;
			return true;
		}
	}
	return false;
}


int losowa_liczba(int min = 0, int max = std::numeric_limits<int>::max())
{
	static std::default_random_engine gen(std::random_device{}());
	static std::uniform_int_distribution<int> dist;
	return dist(gen, std::uniform_int_distribution<int>::param_type{ min, max });
}

int main()
{
	int q = 0;
	int w = 10000;
	int tablica[100000];
	for (int j = 0; j < 100000; j++)
	{
		tablica[j] = losowa_liczba(0, INT_MAX);
	}
	int rozmiar = 1000000;
	int* tab = new int[rozmiar];
	for (int i = 0; i < rozmiar; i++)
	{
		tab[i] = -1;
	}
	for (int z = 0; z < 10; z++)
	{
		auto start = std::chrono::high_resolution_clock::now();
		for (int m = q; m < w; m++)
		{
			hash_al_wstaw(tablica[m], tab, rozmiar);
		}
		auto end = std::chrono::high_resolution_clock::now();
		for (int n = 0; n < 90000; n++)
		{
			hash_al_wstaw(losowa_liczba(0, INT_MAX), tab, rozmiar);
		}
		std::chrono::duration<double, std::micro> duration = end - start;
		cerr << "Uplynelo: " << duration.count()/10000 << "us\n";
		q = q + 10000;
		w = w + 10000;
	}
}
