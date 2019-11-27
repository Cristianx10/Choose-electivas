import LoadFileCombine from '../../objects/utils/loadFileCombine';
import ManagerKNN from '../../objects/Knn/ManagerKNN';

import DatabaseElectivasVsInfo from "../../data/ELECTIVAS_VS_INFO.csv";
import DatabaseElectivasVsLugares from "../../data/ELECTIVAS_VS_LUGARES.csv";
import DatabaseLugaresVsInfo from "../../data/LUGARES_VS_INFO.csv";
import DatabaseNameVsInfoElectivas from "../../data/NAME_VS_INFO_ELECTIVAS.csv";
import DatabaseNameVsInfoLugares from "../../data/NAME_VS_INFO_LUGARES.csv";


var loadFileElectivasVsInfo = new LoadFileCombine(DatabaseElectivasVsInfo);
var loadFileElectivasVsLugares = new LoadFileCombine(DatabaseElectivasVsLugares);
var loadFileLugaresVsInfo = new LoadFileCombine(DatabaseLugaresVsInfo);
var loadFileNameVsInfoElectivas = new LoadFileCombine(DatabaseNameVsInfoElectivas);
var loadFileNameVsInfoLugares = new LoadFileCombine(DatabaseNameVsInfoLugares);

export var knnNameElectivas = new ManagerKNN([loadFileNameVsInfoElectivas.databaseA, loadFileNameVsInfoElectivas.databaseB]);
export var knnNameLugares = new ManagerKNN([loadFileNameVsInfoLugares.databaseA, loadFileNameVsInfoLugares.databaseB]);

export var knnElectivas = new ManagerKNN([loadFileElectivasVsInfo.databaseA, loadFileElectivasVsInfo.databaseB]);
export var knnLugares = new ManagerKNN([loadFileElectivasVsLugares.databaseA, loadFileElectivasVsLugares.databaseB]);

export var knnElectivasVsLuages = new ManagerKNN([loadFileLugaresVsInfo.databaseA, loadFileLugaresVsInfo.databaseB]);