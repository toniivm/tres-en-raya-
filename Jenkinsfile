pipeline {
    agent any

    environment {
        FIREBASE_TOKEN = credentials('firebase-token')
        NODE_HOME = 'C:\\Program Files\\nodejs'
        PATH = "C:\\Program Files\\nodejs;${env.PATH}"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Lint') {
            steps {
                bat 'npm run lint'
            }
        }

        stage('Test') {
            steps {
                bat 'npm test'
            }
        }

        stage('Build') {
            steps {
                bat 'npm run build'
            }
        }

        stage('Deploy to Firebase') {
            steps {
                bat "npx firebase-tools deploy --token %FIREBASE_TOKEN% --only hosting --non-interactive"
            }
        }
    }

    post {
        always {
            cleanWs()
        }
        success {
            echo 'Despliegue completado con exito.'
        }
        failure {
            echo 'El pipeline ha fallado. Revisa los logs.'
        }
    }
}
