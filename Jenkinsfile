pipeline {
    agent any

    environment {
        IMAGE_NAME = "msalihogun/pipeline-app"
        TAG = "v1"
    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/ogunmehmetsalih/pipeline-app.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $IMAGE_NAME:$TAG .'
            }
        }

        stage('Push Docker Image') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh """
                    echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                    docker push $IMAGE_NAME:$TAG
                    """
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh '''
                kubectl delete deployment node-web --ignore-not-found
                kubectl apply -f deployment.yaml
                kubectl rollout status deployment/node-web
                '''
            }
        }
    }
}

