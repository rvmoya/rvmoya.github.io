# Base image: Ruby with necessary dependencies for Jekyll
FROM ruby:3.2

# Install dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    nodejs \
    && rm -rf /var/lib/apt/lists/*

<<<<<<< HEAD
=======
# Set the working directory
WORKDIR /usr/src/app

# Copy Gemfile and Gemfile.lock into the container BEFORE creating user
COPY Gemfile Gemfile.lock ./

# Install bundler and dependencies as root
RUN gem install connection_pool:2.5.0 && \
    gem install bundler:2.3.26 && \
    bundle install
>>>>>>> 57028cf (Initial commit with git)

# Create a non-root user with UID 1000
RUN groupadd -g 1000 vscode && \
    useradd -m -u 1000 -g vscode vscode

<<<<<<< HEAD
# Set the working directory
WORKDIR /usr/src/app

=======
>>>>>>> 57028cf (Initial commit with git)
# Set permissions for the working directory
RUN chown -R vscode:vscode /usr/src/app

# Switch to the non-root user
USER vscode

<<<<<<< HEAD
# Copy Gemfile into the container (necessary for `bundle install`)
COPY Gemfile ./



# Install bundler and dependencies
RUN gem install connection_pool:2.5.0
RUN gem install bundler:2.3.26
RUN bundle install

# Command to serve the Jekyll site
CMD ["jekyll", "serve", "-H", "0.0.0.0", "-w", "--config", "_config.yml,_config_docker.yml"]
=======
# Command to serve the Jekyll site
CMD ["jekyll", "serve", "-H", "0.0.0.0", "-w", "--force-polling", "--config", "_config.yml,_config_docker.yml"]
>>>>>>> 57028cf (Initial commit with git)
