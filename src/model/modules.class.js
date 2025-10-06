import Module from "./module.class.js";
export default class Modules {
  constructor() {
    this.data = [];
  }

  populate = (modulesData) => {
    this.data = modulesData.map(
      (m) => new Module(m.code, m.cliteral, m.vliteral, m.courseId)
    );
  };

  getModuleByCode = (moduleCode) => {
    const module = this.data.find((mod) => mod.code === moduleCode);
    if (!module) throw new Error("Module not found");
    return module;
  };

  toString() {
    return this.data.map((m) => m.toString()).join("\n");
  }
}
