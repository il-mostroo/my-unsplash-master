<?php  

class Dbh {
    private $host = "localhost";
    private $dbname = "gallery";
    private $dbusername = "root";
    private $dbpassword = "mariadbpassword";

    protected function connect() {
        $pdo = new PDO('mysql:host=' . $this->host . ";dbname=" . $this->dbname, $this->dbusername, $this->dbpassword);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $pdo;
    }
}
