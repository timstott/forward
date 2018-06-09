provider "aws" {
  version = "1.18.0"
  region  = "eu-west-1"
  profile = "forward.infrastructure"
}

provider "aws" {
  alias   = "acm"
  region  = "us-east-1"
  profile = "forward.infrastructure"
}
