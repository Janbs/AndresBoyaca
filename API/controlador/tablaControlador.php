<?php
require_once('./modelo/tablaModelo.php');
class tablaControlador 
{
	private $tablaModelo;
	public function __construct($cConexion)
	{
		$this->tablaModelo = new tablaModelo($cConexion);
	}

	public function getTablas($nId){
		$bResult = $this->tablaModelo->listarTabla($nId);
		if($bResult){
			return $this->tablaModelo->getResultado();
		}else{
			return false;
		}

	}
	public function getTabla($nId){
		
		return $this->tablaModelo->listarTabla();
	}
	public function setTabla($arrParams){
		$bInsert = $this->tablaModelo->insertTabla($arrParams);
		return ($bInsert) ? ['message'=>"Insert Exitoso" ,"state" =>true ] : ['message'=>"Error" ,"state" =>falso ];
	}
	public function deleteTable($nId){
		$bDelete = $this->tablaModelo->deleteTable($nId);
		return ($bDelete) ? ['message'=>"Delete Exitoso" ,"state" =>true ] : ['message'=>"Error" ,"state" =>$this->tablaModelo->sMensajeError ];
	}
	public function updateTabla($nId,$arrParams){
		$bInsert = $this->tablaModelo->updateTable($nId,$arrParams);
		return ($bInsert) ? ['message'=>"Update Exitoso" ,"state" =>true ] : ['message'=>"Error" ,"state" =>falso ];
	}

}


?>