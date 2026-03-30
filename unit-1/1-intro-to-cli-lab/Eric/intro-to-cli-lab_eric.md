mkdir star-wars
cd star-wars/
mkdir death-star
cd death-star/
touch darth-vader.txt
touch princess-leia.txt
touch storm-trooper.txt
cd ../../star-wars/
mkdir galaxy-far-far-away
cd galaxy-far-far-away/
mkdir tatooine
cd tatooine/
touch luke.txt
touch ben-kenobi.txt
mkdir millenium-falcon
cd millenium-falcon/
touch han-solo.txt chewbacca.txt
cd ../../../death-star
cp storm-trooper.txt ../galaxy-far-far-away/tatooine/
cd ../galaxy-far-far-away/tatooine/
mv luke.txt ben-kenobi.txt ./millenium-falcon/
mv millenium-falcon ../../galaxy-far-far-away/
cd ..
mv millenium-falcon/ ../death-star/
cd ../death-star/
mv princess-leia.txt ./millenium-falcon/
cd millenium-falcon/
mv ben-kenobi.txt obi-wan.txt
rm obi-wan.txt
cd ../../galaxy-far-far-away/
mkdir yavin-4
mv ../death-star/millenium-falcon/ yavin-4/
cd yavin-4/
cd millenium-falcon/
mv princess-leia.txt ../../yavin-4/
mv luke.txt ../x-wing/
cd ..
mv millenium-falcon x-wing ../../galaxy-far-far-away/
cd ../../death-star/
mkdir tie-fighter-1 tie-fighter-2 tie-fighter-3
mv darth-vader.txt ./tie-fighter-1/
cp storm-trooper.txt ./tie-fighter-2
cp storm-trooper.txt ./tie-fighter-3
mv ./tie-fighter-1 ./tie-fighter-2 ./tie-fighter-3 ../galaxy-far-far-away/
cd ../galaxy-far-far-away/
rm -r tie-fighter-2/ tie-fighter-3
cd x-wing
touch the-force.txt
cd ..
rm -r death-star
cd galaxy-far-far-away/
mv x-wing/ millenium-falcon/ ./yavin-4/
