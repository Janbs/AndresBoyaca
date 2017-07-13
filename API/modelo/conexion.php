<?php 
require_once("./config.php");
/**
* La Conexionse puede realizar con PDO pero ya que se solicita con MYSQL  se realiza con la extension especificada por el proveedor
**/
class conexion extends mysqli{
	private $cConexion;
	private $sUsuario;
	private $sContraseña;
	private $sHost;
	private $sBase;
	public function __construct($sBase = null) {
     	$this->sUsuario = config::$sUsuario;
     	$this->sContraseña = config::$sContraseña;
     	$this->sHost = config::$sHost;
     	$this->sBase = isset($sBase) ? $sBase : 'andresboyaca';
     	$this->conectar();
   	}
	private function conectar(){
 		parent::__construct($this->sHost, $this->sUsuario, $this->sContraseña, $this->sBase);
        if ($this->connect_errno) {
            file_put_contents('log.txt',  date('Y-m-d H:i:s').' '.$this->connect_error .PHP_EOL, FILE_APPEND | LOCK_EX);
        } else {
            file_put_contents('log.txt',  date('Y-m-d H:i:s').' Conexio realizada exitosamente'.PHP_EOL, FILE_APPEND | LOCK_EX);
        }
	}
	public function getConexion(){
		return $this;
	}
	public function closeConexion(){
			$this->close();
	}
}

?>