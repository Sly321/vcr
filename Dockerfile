# Create a new image from the base nodejs image.
FROM node:latest

ARG cc_test_report_id_travis

# set the loglevel for npm with environment variable
ENV NPM_CONFIG_LOGLEVEL=warn
ENV CC_TEST_REPORTER_ID=$cc_test_report_id_travis

# Install Google Chrome
# RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
# RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
# RUN apt-get -qq update && apt-get -qq install -y google-chrome-stable

# Create the target directory in the image.
RUN mkdir -p /usr/src/app
# Set the created directory as the working directory
WORKDIR /usr/src/app
# Copy the package.json inside the working directory
COPY . /usr/src/app

RUN sh -c 'curl -L https://codeclimate.com/downloads/test-reporter/test-reporter-latest-linux-amd64 > ./cc-test-reporter'
RUN sh -c 'chmod +x ./cc-test-reporter'

# Install required dependencies
RUN npm install --loglevel=warn
RUN npm i -g gulp

# Pre Test
RUN sh -c './cc-test-reporter before-build'

# Run Tests
RUN npm run testc -- --verbose

# Installing Code Climate
#RUN npm install -g codeclimate-test-reporter

RUN sh -c './cc-test-reporter format-coverage --output coverage/lcov.info'

# RUN sh -c './cc-test-reporter after-build --exit-code 0'

RUN sh -c './cc-test-reporter upload-coverage -i coverage/lcov.info'

#RUN codeclimate-test-reporter < coverage/lcov.info

# Open port 4200. This is the port that our development server uses
EXPOSE 4200
# Start the application. This is the same as running ng serve.
CMD ["npm", "start"]