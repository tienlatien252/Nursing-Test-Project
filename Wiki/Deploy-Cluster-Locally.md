
`$ export PROJECT_ID=iron-entropy-285002`

`$ export ACCOUNT_NAME=kubernetes-service-account`

### Authentication to GCR

`$ gcloud iam service-accounts keys create --iam-account $ACCOUNT_EMAIL key.json`

`$ docker login -u _json_key --password-stdin https://us.gcr.io < key.json`

`$ kubectl create secret docker-registry gcr-io \
  --docker-server us.gcr.io \
  --docker-username _json_key \
  --docker-email not@val.id \
  --docker-password="$(cat ~/key.json)"`

`$ kubectl patch serviceaccount default -p '{"imagePullSecrets": [{"name": "us-gcr-io"}]}'`

### Install nginx ingress

- Install helm 
- Install nginx
`$ helm install nginx-ingress stable/nginx-ingress`

### Apply

`$ kubectl apply -f deploy-backend.yaml`

`$ kubectl apply -f deploy-backend.yaml`