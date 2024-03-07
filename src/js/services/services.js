import PhotoService from './camera/PhotoService';
import PurchaseService from './storage/PurchaseService';
import PreferencesManager from "./preferences/PreferencesManager";
const photoService = new PhotoService;
const purchaseService = new PurchaseService;
const preferencesManager = new PreferencesManager;
purchaseService.initialize();


export {purchaseService, preferencesManager, photoService}