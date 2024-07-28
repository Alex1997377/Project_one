resource "yandex_mdb_mongodb_cluster" "mymongo_project" {
  name                = "mymongo_project"
  environment         = "PRODUCTION"
  network_id          = yandex_vpc_network.network.id
  security_group_ids  = [yandex_vpc_security_group.security-group.id]
  deletion_protection = true

  cluster_config {
    version = "6.0"
  }

  resources_mongod {
    resource_preset_id = "s2.micro"
    disk_type_id       = "network-ssd"
    disk_size          = 10
  }

  host {
    zone_id   = "ru-central1-a"
    subnet_id = yandex_vpc_subnet.subnet-a.id
  }
}

resource "yandex_mdb_mongodb_database" "mongodb_database" {
  cluster_id = yandex_mdb_mongodb_cluster.mymongo_project.id
  name       = "mongodb_database"
}

resource "yandex_mdb_mongodb_user" "alex" {
  cluster_id = yandex_mdb_mongodb_cluster.mymongo_project.id
  name       = local.name
  password   = local.password
  permission {
    database_name = "mongodb_database"
  }
  depends_on = [
    yandex_mdb_mongodb_database.mongodb_database
  ]
}
