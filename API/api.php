<?php
header("Content-type:application/json");
header('Access-Control-Allow-Origin: *', false);
header('Access-Control-Allow-Methods: GET,POST,PUT,DELETE,OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With ,x-www-form-urlencoded');

// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);

require_once ("modelo/conexion.php");

require_once ("config.php");

$method = $_SERVER['REQUEST_METHOD'];
$request = explode('/', trim($_SERVER['PATH_INFO'], '/'));
$objConexion = new conexion();
$sObjetoAPI = array_shift($request);

if ($sObjetoAPI == 'customer')
	{
	require_once ("controlador/tablaControlador.php");

	$objTablaControlador = new tablaControlador($objConexion);

	// Se puede crear un autoloadar de todos los controladores

	switch ($method)
		{
	case 'GET':
		$sParams = (count($request) > 0) ? $request[0] : null;
		$objValidacion = $objTablaControlador->getTablas($sParams);
		if ($objValidacion === false)
			{
			config::header_status('500');
			}
		  else
			{
			config::header_status('200');
			echo json_encode($objValidacion);
			}
		break;
	case 'PUT':
		$arrDatos = [];
		$datosPUT = fopen("php://input", "r");
		while ($query = fread($datosPUT, 1024))
			{
			foreach(explode('&', $query) as $chunk)
				{
				$param = explode("=", $chunk);
				if ($param)
					{
					$arrDatos[$param[0]] = $param[1];
					}
				}
			}
		fclose($datosPUT);
		 $arrResult = $objTablaControlador->updateTabla($request[0],$arrDatos);
		 echo json_encode($arrResult);
		break;
	case 'POST':
		$arrResult = $objTablaControlador->setTabla($_POST);
		echo json_encode($arrResult);
		// Se pueden manejar codigos de estado como en el GET
		break;
	case 'DELETE':
		$arrResult = $objTablaControlador->deleteTable($request[0]);
		echo json_encode($arrResult);
		break;
		}
	}
elseif ($sObjetoAPI == 'tabla2')
	{
	// Mas opciones al API

	}
?>
 
