variable "hosted_zone" {
  description = <<EOF
The hosted zone on whick to create a record

Exmaple:
hosted_zone = predicate.xyz
environment = development
service     = forward

Will create the record

development.forward.predicate.xyz
EOF

  default = "predicate.xyz"
}

variable "service" {
  description = "The name of service being deployed"
  default     = "forward"
}

variable "environment" {
  description = "The environment to deploy to"
}
