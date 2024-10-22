export interface Config {
  database: DatabaseConfig;
}

interface DatabaseConfig {
  MYSQL_URI: string;
}
