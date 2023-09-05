kubectl apply -f ./k8s/auth-depl.yaml

kubectl apply -f ./k8s/auth-mongo-depl.yaml

kubectl apply -f ./k8s/client-depl.yaml

kubectl apply -f ./k8s/ingress-srv.yaml





kubectl delete deployment auth-depl

kubectl delete deployment auth-mongo-depl

kubectl delete deployment client-depl

kubectl delete service ingress-srv