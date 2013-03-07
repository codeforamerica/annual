s3cmd -r --acl-public --add-header 'Cache-Control: max-age=1500' --force --progress sync _site/ s3://
