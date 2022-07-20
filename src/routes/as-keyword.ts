import { Router, Request, Response } from "express";

const router: Router = Router();
interface AsTest1 {
  name: string;
  age: number;
}
interface AsTest2 {
  name: string;
}
router.get("/api/as-keyword", function (req: Request, res: Response) {
  let testFn1: (str: AsTest1) => number = (str) => {
    return str.age;
  };
  let testFn2 = (str: AsTest2): string => {
    return str.name;
  };
  const obj1 = {
    name: "Srikar",
    age: 3,
  } as AsTest2;
  //   console.log(obj1); // Prints { name: 'Srikar', age: 3 }
  //   console.log(obj1.age) // --> error as AsTest2 has no age prop though obj1 has the prop
  //   console.log(testFn1(obj1)); // error, missing age. type 'AsTest2' is not assignable to parameter of type 'AsTest1'
  //   console.log(testFn2(obj1 as AsTest1)); // Prints Srikar
  //   console.log(testFn1(obj1 as AsTest1)); // Prints 3

  // const obj2:AsTest1 = {
  //     name: "Srikar",
  //     age: 3,
  //   } as AsTest2 // error, saying Property 'age' is missing in type 'AsTest2' but required in type 'AsTest1'.

  const obj3: AsTest2 = {
    name: "Srikar",
    age: 3,
  } as AsTest2;
  //   console.log(obj3 as AsTest1); // Prints { name: 'Srikar', age: 3 }
  //   console.log(obj3.age) // --> error as AsTest2 has no age prop though obj3 has the prop

  const obj4: AsTest2 = {
    name: "Srikar",
    age: 3,
  } as AsTest1;
  //   console.log(obj4.age) // --> error as AsTest2 has no age prop though obj4 has the prop
  // console.log(testFn2(obj4)); // no Error. Prints Srikar. Since different case for function call

  const obj5: AsTest1 = {
    name: "Srikar",
  } as AsTest1;
  //   console.log(testFn1(obj5)); // no error, undefined
  //   console.log(testFn2(obj5)); // Prints Srikar
  //   console.log(obj5 as AsTest1); // Prints { name: 'Srikar' }
  //   console.log(obj5.age); // no error, undefined
  //   console.log(obj5 as AsTest2); // Prints { name: 'Srikar' }

  const obj6: AsTest2 = {
    name: "Srikar",
  } as AsTest1;
  //   console.log(obj6 as AsTest1); // Prints { name: 'Srikar' }
  // console.log(obj6.age) // error
  //   console.log(testFn1(obj7)) // error

  const obj7: AsTest2 = {
    name: "Srikar",
  } as AsTest2;
  //   console.log(obj7 as AsTest1); // Prints { name: 'Srikar' }
  //   console.log(testFn1(obj7 as AsTest1)); // Prints undefined

  const obj8 = {
    name: "Srikar",
    age: 3,
  };
  //   console.log(testFn2(obj8 as AsTest1)); // Prints Srikar

  const obj9: AsTest2 = {
    name: "Srikar",
  };
  //   console.log(testFn1(obj8 as AsTest1)); // Prints Srikar

  const obj10: AsTest1 = {
    name: "Srikar",
    age: 3,
  };
  // console.log(testFn2(obj10)); // no Error. Prints Srikar. Since different case for function call

  res.status(200).send({ msg: "done" });
});

export { router as asKeywordRuoter };
