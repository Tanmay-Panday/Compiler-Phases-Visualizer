import Phase0CardImg from '../assets/Phase0CardImg.jpeg'
import Phase1CardImg from '../assets/Phase1CardImg.png'
import Phase2CardImg from '../assets/Phase2CardImg.png'
import Phase3CardImg from '../assets/Phase3CardImg.png'
import Phase4CardImg from '../assets/Phase4CardImg.png'
import Phase5CardImg from '../assets/Phase5CardImg.png'

const PracticalPageInfo = {
  phase_zero_info: {
    title: "Phase 0 - Code Writing",
    description:
      `This is the phase where you can select a programming language and write your code.
       The code editor is powered by Monaco Editor, which provides syntax highlighting and other features.`,
    logo: Phase0CardImg,
  },
  phase_one_info: {
    title: "Phase 1 - Lexical Analysis",
    description:
      `In this phase, the code you wrote in Phase 0 is sent to the backend for lexical analysis.
       The backend processes the code and returns a list of tokens, which are the basic building blocks of your code.
       This phase is crucial for understanding the structure of your code.`,
    logo: Phase1CardImg,
  },
  phase_two_info: {
    title: "Phase 2 - Syntax Analysis",
    description:
      `In this phase, the tokens generated in Phase 1 are sent to the backend for syntax analysis.
       The backend processes the tokens and returns a parse tree, which represents the hierarchical structure of your code.
       This phase is essential for understanding how different parts of your code relate to each other.`,
    logo: Phase2CardImg,
  },
  phase_three_info: {
    title: "Phase 3 - Semantic Analysis",
    description:
      `In this phase, the parse tree generated in Phase 2 is sent to the backend for semantic analysis.
        The backend processes the parse tree and checks for semantic errors, such as type mismatches or undefined variables.
       This phase is important for understanding the meaning of your code and ensuring that it follows the rules of the programming language.`,
    logo: Phase3CardImg,
  },
  phase_four_info: {
    title: "Phase 4 - Intermediate Code Generation",
    description:
      `In this phase, the parse tree generated in Phase 2 is sent to the backend for intermediate code generation.
       The backend processes the parse tree and generates an intermediate representation of your code.
       This phase is important for optimizing your code and making it easier to translate into machine code.`,
    logo: Phase4CardImg,
  },
  phase_five_info: {
    title: "Phase 5 - Optimized Target Code Generation",
    description:
      `In this phase, the intermediate representation generated in Phase 4 is sent to the backend for target code generation.
       The backend processes the intermediate representation and generates the final machine code or bytecode after applying various optimizations.
       This phase is crucial for executing your code on a computer.`,
    logo: Phase5CardImg,
  },
};

export default PracticalPageInfo;
