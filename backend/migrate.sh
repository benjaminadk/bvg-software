# copy contents of local database into a tar file
pg_dump -Ft -U postgres -d bvgsoftware -f data.tar

# send tar file to server
scp data.tar root@143.198.133.253:/var/www/bvgsoftware.com/data.tar