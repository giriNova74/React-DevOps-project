pipeline {
  agent any

  environment {
    BACKEND_IMAGE = 'giriprasad74/backend:latest'
    FRONTEND_IMAGE = 'giriprasad74/frontend:latest'
  }

  stages {
    stage('Clone Repo') {
      steps {
        git credentialsId: 'github-creds', url: 'https://github.com/giriNova74/React-DevOps-project.git'
      }
    }

    stage('Build Backend') {
      steps {
        dir('backend') {
          sh 'docker build -t $BACKEND_IMAGE .'
        }
      }
    }

    stage('Build Frontend') {
      steps {
        dir('frontend') {
          sh 'docker build -t $FRONTEND_IMAGE .'
        }
      }
    }

    stage('Push to DockerHub') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
          sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
          sh 'docker push $BACKEND_IMAGE'
          sh 'docker push $FRONTEND_IMAGE'
        }
      }
    }
  }

  post {
    success {
      echo '✅ Docker build and push successful!'
    }
    failure {
      echo '❌ Build failed.'
    }
  }
}
