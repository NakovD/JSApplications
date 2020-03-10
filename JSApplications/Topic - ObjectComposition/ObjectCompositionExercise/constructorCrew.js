function solve(obj){
    if (obj.dizziness) {
        let neededWater = 0.1 * obj.experience * obj.weight;
        obj.levelOfHydrated += neededWater;
        obj.dizziness = false;
        return obj;
    }else {
        return obj;
    }
}
solve({ weight: 80,
  experience: 1,
  levelOfHydrated: 0,
  dizziness: true });