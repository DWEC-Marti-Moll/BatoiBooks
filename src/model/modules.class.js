import Module from './module.class.js';
export default class Modules{
    constructor(){
        this.data = [];
    }
    
    populate(modulesData, courseId) {
        this.data = modulesData.map(
          m => new Module(m.code, m.cliteral, m.vliteral, courseId)
        );
      }
      
      
}