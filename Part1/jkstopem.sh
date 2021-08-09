#!/bin/bash
srcFolder=$1
keyStore=$1/$2
password=$3
alias=$4
outputFolder=$5

echo Generating CARoot.pem with:
GENERATE_CAROOT="keytool -exportcert -alias $alias -keystore $keyStore -rfc -file $outputFolder/CARoot.pem -storepass $password"
echo $GENERATE_CAROOT
$GENERATE_CAROOT

echo Generating key.pem with keytool ...
GENERATE_CERTIFICATE_AND_KEY="keytool -v -importkeystore -srckeystore $keyStore -srcalias $alias -destkeystore $outputFolder/cert_and_key.p12 -deststoretype PKCS12 -storepass $password -srcstorepass $password"
echo $GENERATE_CERTIFICATE_AND_KEY
$GENERATE_CERTIFICATE_AND_KEY
echo ... and openssl
GENERATE_KEY="openssl pkcs12 -in $outputFolder/cert_and_key.p12 -nodes -nocerts -out $outputFolder/key.pem -passin pass:$password"
echo $GENERATE_KEY
$GENERATE_KEY