pipeline {
    agent any

    stages {
        stage("Checkout") {
            steps {
                git branch: "main", url: "https://github.com/soyYaaG/ensaware-web.git"
            }
        }

        stage("Build") {
            steps {
                script {
                    sh "docker-compose build"
                }
            }
        }

        stage("Deploy") {
            steps {
                sh "docker-compose up -d"
            }
        }
    }
}
