# worknet backoffice
მალე..

სამართავი პანელი რომელიც უნდა გამოიყენოს დასაქმების სააგენტომ.

## დეველოპერებს
#### branch-ის სახელი
საკითხის ნომერი (issue number)/მოკლე-დასახელება

მაგ.
```
git checkout -b 7/users-search
```

### მონაცემები უნდა წაიკითხოს worknet_ის მონაცემთა ბაზიდან.

### თუ იზოლირებულად გატესტვა გინდათ

#### Docker კონტეინერი (elasticsearch)
https://www.docker.elastic.co/

```
docker run --name backoffice -p 9200:9200 -itd docker.elastic.co/elasticsearch/elasticsearch:6.1.1
```

#### პირველადი სატესტო მონაცემების ჩაწერა ბაზაში (Test Data)
```
node seedtestdata.js
```
