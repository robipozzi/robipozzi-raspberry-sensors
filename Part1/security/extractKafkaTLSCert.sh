source ../setenv.sh
# ##### Variable section - START
SCRIPT=extractKafkaTLSCert.sh
KAFKA_CLUSTER_NAME=
OPENSHIFT_NAMESPACE=
# ##### Variable section - END

# ***** Function section - START
extractTLSCert()
{
    ### Extract TLS certificate for Kafka cluster from Openshift secret
    EXTRACT_CERT_CMD_RUN="oc extract secret/$KAFKA_CLUSTER_NAME-cluster-ca-cert --keys=ca.crt --to=certs --confirm -n $OPENSHIFT_NAMESPACE"
    echo ${cyn}Extracting TLS certificate from Kafka cluster with:${end} ${grn}$EXTRACT_CERT_CMD_RUN${end}
    $EXTRACT_CERT_CMD_RUN
    ### Import TLS certificate into Truststore 
    KEYTOOL_IMPORT_CMD_RUN="keytool -import -trustcacerts -alias root -file certs/ca.crt -keystore certs/truststore.jks -storepass password -noprompt"
    echo ${cyn}Importing TLS certificate with:${end} ${grn}$KEYTOOL_IMPORT_CMD_RUN${end}
    $KEYTOOL_IMPORT_CMD_RUN
}

inputKafkaClusterName()
{
    ###### Setup Kafka cluster name
    if [ "$KAFKA_CLUSTER_NAME" != "" ]; then
        echo Kafka cluster name is set to $KAFKA_CLUSTER_NAME
    else
        echo ${grn}Enter Kafka cluster name - leaving blank will set Kafka cluster name to ${end}${mag}robipozzi-kafka : ${end}
        read KAFKA_CLUSTER_NAME
        if [ "$KAFKA_CLUSTER_NAME" == "" ]; then
            KAFKA_CLUSTER_NAME=robipozzi-kafka
        fi
    fi
}

inputOpenshiftNamespace()
{
    ###### Setup Openshift namespace
    if [ "$OPENSHIFT_NAMESPACE" != "" ]; then
        echo Openshift namespace for Kafka cluster is set to $OPENSHIFT_NAMESPACE
    else
        echo ${grn}Enter Openshift namespace for Kafka cluster - leaving blank will set namespace to ${end}${mag}openshift-operators : ${end}
        read OPENSHIFT_NAMESPACE
        if [ "$OPENSHIFT_NAMESPACE" == "" ]; then
            OPENSHIFT_NAMESPACE=openshift-operators
        fi
    fi
}

main()
{
    inputKafkaClusterName
    inputOpenshiftNamespace
    extractTLSCert
}
# ***** Function section - END

# ##############################################
# #################### MAIN ####################
# ##############################################
main