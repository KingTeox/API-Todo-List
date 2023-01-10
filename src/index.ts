console.log(`[Teox] <Process> Reading: *Files*`);
import system from "./services/system";

try {
    const System = new system()
    System.start(); 
} catch (error) {  
    console.log(`[Teox] <System> ${error}`);
};

console.log(`[Teox] <Process> Readed: *Files*`);