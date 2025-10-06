pipeline {
    agent any

    environment {
        APP_NAME = "insurance_app"
        DEPLOY_USER = "ubuntu"
        DEV_SERVER = "13.200.251.60"
        PREPROD_SERVER = "13.201.150.45"
        PROD_SERVER = "13.202.120.78"
        REPO = "https://github.com/Sachinjadhav8/insurance-_application.git"
    }

    stages {
        stage('Checkout') {
            steps {
                // Automatically checkout the branch that triggered the build
                git branch: "${env.BRANCH_NAME}", url: "${REPO}"
            }
        }

        stage('Deploy') {
            steps {
                script {
                    // Determine which server to deploy to
                    if (env.BRANCH_NAME == 'dev') {
                        DEPLOY_SERVER = DEV_SERVER
                    } else if (env.BRANCH_NAME == 'preprod') {
                        DEPLOY_SERVER = PREPROD_SERVER
                    } else if (env.BRANCH_NAME == 'prod') {
                        DEPLOY_SERVER = PROD_SERVER
                        // Optional: require manual approval for prod
                        input "Approve deployment to PROD?"
                    } else {
                        error "Branch ${env.BRANCH_NAME} is not configured for deployment!"
                    }

                    echo "Deploying branch ${env.BRANCH_NAME} to ${DEPLOY_SERVER}"

                    sshagent(['ubuntu']) {
                        sh """
                        # Backup old deployment on remote server
                        ssh -o StrictHostKeyChecking=no ${DEPLOY_USER}@${DEPLOY_SERVER} "
                            if [ -d /var/www/html ]; then
                                mv /var/www/html /var/www/html_backup_\$(date +%F_%T)
                            fi
                            mkdir -p /var/www/html
                        "

                        # Copy all repo files to EC2
                        scp -r * ${DEPLOY_USER}@${DEPLOY_SERVER}:/var/www/html/

                        # Set permissions for Nginx
                        ssh ${DEPLOY_USER}@${DEPLOY_SERVER} "sudo chown -R www-data:www-data /var/www/html"

                        # Restart Nginx to apply changes
                        ssh ${DEPLOY_USER}@${DEPLOY_SERVER} "sudo systemctl restart nginx"
                        """
                    }
                }
            }
        }
    }

    post {
        success {
            echo "Deployment of branch ${env.BRANCH_NAME} to ${DEPLOY_SERVER} completed successfully!"
        }
        failure {
            echo "Deployment failed. Check logs for details."
        }
    }
}
