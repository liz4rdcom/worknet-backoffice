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

### docker კონტეინერი (mongo) მომხმარებლების მართვისთვის
```
docker run --name backoffice-mongo -p 27019:27017 -itd mongo
```
### სატესტო მომხმარებლის შექმნა
```
node seedtestuser.js
```
