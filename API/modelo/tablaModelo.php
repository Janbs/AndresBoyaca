<?php
class tablaModelo
{
	private $cConexion;
	private $sTable = 'customer';
	private $nConteo;
	private $arrResponde = array();
	public $sMensajeError;
	public function __construct($cConexion)
	{
		$this->cConexion = $cConexion;
	}

	public function listarTabla($nId)
	{
		try
		{	
			$sWhere = ($nId!=null) ?  " where id = {$nId}" : "";
			$resultado = $this->cConexion->query("SELECT * FROM {$this->sTable} {$sWhere}");
			if ($resultado)
			{
				$this->nConteo = $resultado->num_rows;
				while ($row = $resultado->fetch_object())
				{
					$this->arrResponse[] = $row;
				}
			}else{
				$this->sMensajeError = $this->cConexion->error;	
				$this->cConexion->closeConexion();
				return false;
			}
			$resultado->close();
			$this->cConexion->closeConexion();
			return true;
		}
		catch(Exception $e)
		{
			file_put_contents('log.txt', date('Y-m-d H:i:s') . ' ' . $e->getMessage() . PHP_EOL, FILE_APPEND | LOCK_EX);
			$this->sMensajeError = $e->getMessage();
			$this->cConexion->closeConexion();
			return false;
		}
	}

	public function insertTabla($arrData)
	{
		//Se puede utilizar try catch como arriba
		$stament = $this->cConexion->prepare("INSERT INTO {$this->sTable} (nombre,tipo_identificacion,identificacion,numero,fecha_nacimiento) VALUES (?, ?,?, ?, ?)");
		//Se pueden validar datos y verificar que si es int sea de tipo int el arrDatos but u kwon!
		$stament->bind_param('ssiss',$arrData['nombre'], $arrData['tipo_identificacion'], $arrData['identificacion'], $arrData['numero'],$arrData['fecha_nacimiento']);
		$stament->execute();
		if($stament->affected_rows>0){
			$stament->close();
			return true;
		}else{
			$stament->close();
			return false;
		}

	}

	public function deleteTable($nId)
	{
	try
		{
			$stament = $this->cConexion->prepare("DELETE FROM {$this->sTable} WHERE id =?");
			//Se pueden validar datos y verificar que si es int sea de tipo int el arrDatos but u kwon!
			$stament->bind_param('i',$nId);
			$stament->execute();
			if($stament->affected_rows>0){
				$stament->close();
				return true;
			}else{
				$this->sMensajeError ='No se elimino ningun registro';
				$stament->close();
				return false;
			}
		}
		catch(Exception $e)
		{
			file_put_contents('log.txt', date('Y-m-d H:i:s') . ' ' . $e->getMessage() . PHP_EOL, FILE_APPEND | LOCK_EX);
			$this->sMensajeError = $e->getMessage();
			$this->cConexion->closeConexion();
			return false;
		}
	}
	public function updateTable($nId,$arrData)
	{
	try
		{
			$stament = $this->cConexion->prepare("UPDATE {$this->sTable}  SET nombre=? ,tipo_identificacion=? ,identificacion=?,numero=?,fecha_nacimiento=? WHERE id =?");
			$stament->bind_param('ssissi',$arrData['nombre'], $arrData['tipo_identificacion'], $arrData['identificacion'], $arrData['numero'],$arrData['fecha_nacimiento'],$nId);
			$stament->execute();
			if($stament->affected_rows>0){
				$stament->close();
				return true;
			}else{
				$this->sMensajeError ='No se edito ningun registro';
				$stament->close();
				return false;
			}
		}
		catch(Exception $e)
		{
			file_put_contents('log.txt', date('Y-m-d H:i:s') . ' ' . $e->getMessage() . PHP_EOL, FILE_APPEND | LOCK_EX);
			$this->sMensajeError = $e->getMessage();
			$this->cConexion->closeConexion();
			return false;
		}
	}

	public function getResultado()
	{
		return $this->arrResponse;
	}
}

?>