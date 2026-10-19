/* New edition 2026-10-20: chapters 1-4 and chapter 5 through page 29. */
(function(root){const exams=[
  {
    "id": "r2-exam1",
    "title": "01 · 기본 원리 다시 잡기",
    "subtitle": "WORA·타입·생성자·업캐스팅을 새로운 상황에 적용",
    "questions": [
      {
        "type": "mc",
        "chapter": 1,
        "topic": "WORA",
        "prompt": "Windows에서 만든 .class를 호환되는 Linux JVM으로 옮겼다. 같은 소스를 다시 컴파일하지 않고 실행 가능한 이유는?",
        "options": [
          ".class가 Linux 기계어이기 때문",
          "JVM 파일도 두 운영체제에서 동일하기 때문",
          "바이트 코드가 플랫폼 중립적이고 JVM이 이를 실행하기 때문",
          "JRE가 소스를 자동으로 편집하기 때문"
        ],
        "correct": 2,
        "explanation": "정답의 근거는 바이트 코드와 플랫폼별 JVM의 조합이다. .class는 특정 CPU 기계어가 아니고 JVM 구현은 운영체제마다 달라진다.",
        "source": "1장 p.9~13",
        "code": "",
        "id": "r2-exam1-q1",
        "number": 1
      },
      {
        "type": "mc",
        "chapter": 1,
        "topic": "컴파일 명령",
        "prompt": "Report.java의 문법을 검사하고 Report.class를 생성하려면 어떤 명령을 사용하는가?",
        "options": [
          "java Report.class",
          "javac Report.java",
          "jar Report.java",
          "javadoc Report.class"
        ],
        "correct": 1,
        "explanation": "javac는 소스 컴파일, java는 클래스 실행, jar는 묶음 관리, javadoc은 문서 생성이다. 파일 확장자까지 구분한다.",
        "source": "1장 p.14, 24",
        "code": "",
        "id": "r2-exam1-q2",
        "number": 2
      },
      {
        "type": "mc",
        "chapter": 2,
        "topic": "기본 타입",
        "prompt": "정수와 문자를 저장하는 타입의 설명 중 옳은 것은?",
        "options": [
          "char는 음수도 저장하는 1바이트 정수이다",
          "int 크기는 JVM이 실행되는 CPU에 따라 달라진다",
          "boolean에는 정수 0을 대입할 수 있다",
          "char는 2바이트이며 int로 자동 변환할 수 있다"
        ],
        "correct": 3,
        "explanation": "char는 0~65535의 UTF-16 코드 단위이고 int로 확대 가능하다. int는 4바이트이며 boolean과 숫자는 서로 변환하지 않는다.",
        "source": "2장 p.8~16, 21",
        "code": "",
        "id": "r2-exam1-q3",
        "number": 3
      },
      {
        "type": "mc",
        "chapter": 2,
        "topic": "연산 당시 타입",
        "prompt": "다음 코드의 출력 결과는?",
        "options": [
          "4.0 4.5",
          "4.5 4.5",
          "4 4",
          "4.5 4.0"
        ],
        "correct": 0,
        "explanation": "9/2는 int 나눗셈이므로 4를 만든 뒤 double 4.0으로 저장한다. 9/2.0은 나눗셈 전에 double 연산이 되어 4.5다.",
        "source": "2장 p.21~23",
        "code": "double a=9/2;\ndouble b=9/2.0;\nSystem.out.print(a+\" \"+b);",
        "id": "r2-exam1-q4",
        "number": 4
      },
      {
        "type": "mc",
        "chapter": 2,
        "topic": "문자열 연결",
        "prompt": "다음 코드의 출력 결과는?",
        "options": [
          "5=23",
          "23=5",
          "5=5",
          "23=23"
        ],
        "correct": 0,
        "explanation": "2+3이 먼저 정수 5가 된다. 이후 문자열과 연결되므로 뒤의 2와 3은 각각 이어 붙어 5=23이다.",
        "source": "2장 p.29~32",
        "code": "System.out.print(2+3+\"=\"+2+3);",
        "id": "r2-exam1-q5",
        "number": 5
      },
      {
        "type": "mc",
        "chapter": 2,
        "topic": "분기",
        "prompt": "score가 85일 때 출력은?",
        "options": [
          "AB",
          "B",
          "A",
          "아무것도 출력하지 않음"
        ],
        "correct": 2,
        "explanation": "첫 조건 score>=80이 참이면 첫 분기만 실행한다. if-else if에서 두 조건이 참이어도 두 분기를 모두 실행하지 않는다.",
        "source": "2장 p.39~44",
        "code": "int score=85;\nif(score>=80) System.out.print(\"A\");\nelse if(score>=60) System.out.print(\"B\");",
        "id": "r2-exam1-q6",
        "number": 6
      },
      {
        "type": "mc",
        "chapter": 3,
        "topic": "반복 횟수",
        "prompt": "다음 코드에서 별표가 출력되는 횟수는?",
        "options": [
          "3회",
          "4회",
          "5회",
          "6회"
        ],
        "correct": 1,
        "explanation": "i는 0, 2, 4, 6에서 본문에 진입한다. 종료 값 7에 도달해야만 종료하는 것이 아니라 조건이 false가 되면 멈춘다.",
        "source": "3장 p.3~10",
        "code": "for(int i=0;i<7;i+=2)\n    System.out.print(\"*\");",
        "id": "r2-exam1-q7",
        "number": 7
      },
      {
        "type": "mc",
        "chapter": 3,
        "topic": "배열 기본값",
        "prompt": "다음 코드의 출력 결과는?",
        "options": [
          "0 true",
          "0 false",
          "null true",
          "컴파일 오류"
        ],
        "correct": 0,
        "explanation": "int 배열 원소의 기본값은 0, 참조 배열 원소는 null이다. 배열 생성은 지역 변수 선언만 한 경우와 다르게 원소를 기본 초기화한다.",
        "source": "3장 p.18~23",
        "code": "int[] a=new int[2];\nString[] b=new String[2];\nSystem.out.print(a[1]+\" \"+(b[1]==null));",
        "id": "r2-exam1-q8",
        "number": 8
      },
      {
        "type": "mc",
        "chapter": 3,
        "topic": "예외 이름",
        "prompt": "Scanner sc=new Scanner(\"two\"); 뒤 sc.nextInt()를 실행할 때 가장 알맞은 예외는?",
        "options": [
          "NumberFormatException",
          "ArithmeticException",
          "InputMismatchException",
          "NullPointerException"
        ],
        "correct": 2,
        "explanation": "Scanner가 정수로 해석할 수 없는 토큰을 읽으므로 InputMismatchException이다. Integer.parseInt(\"two\")의 NumberFormatException과 구분한다.",
        "source": "3장 p.34~40",
        "code": "",
        "id": "r2-exam1-q9",
        "number": 9
      },
      {
        "type": "mc",
        "chapter": 3,
        "topic": "예외 흐름",
        "prompt": "다음 코드의 출력 결과는?",
        "options": [
          "TF",
          "CF",
          "TCF",
          "T"
        ],
        "correct": 2,
        "explanation": "T를 출력하고 배열 접근에서 예외가 발생한다. E는 건너뛰고 catch의 C와 finally의 F를 실행한다.",
        "source": "3장 p.34~41",
        "code": "int[] a={1};\ntry {\n    System.out.print(\"T\");\n    System.out.print(a[1]);\n    System.out.print(\"E\");\n} catch(ArrayIndexOutOfBoundsException e) {\n    System.out.print(\"C\");\n} finally { System.out.print(\"F\"); }",
        "id": "r2-exam1-q10",
        "number": 10
      },
      {
        "type": "mc",
        "chapter": 4,
        "topic": "기본 생성자",
        "prompt": "다음 코드에 대한 설명으로 옳은 것은?",
        "options": [
          "new Ticket()은 컴파일 오류다",
          "Ticket()은 자동 추가된다",
          "Ticket(int)는 일반 메소드다",
          "new Ticket(3)은 객체를 세 개 만든다"
        ],
        "correct": 0,
        "explanation": "생성자 Ticket(int)를 직접 선언했으므로 컴파일러는 인자 없는 기본 생성자를 추가하지 않는다. int 인자는 객체 개수와 무관하다.",
        "source": "4장 p.17~23",
        "code": "class Ticket {\n    int seat;\n    Ticket(int n) { seat=n; }\n}",
        "id": "r2-exam1-q11",
        "number": 11
      },
      {
        "type": "mc",
        "chapter": 4,
        "topic": "생성자 구별",
        "prompt": "다음 Box 클래스에 대해 옳은 것은?",
        "options": [
          "void Box()는 생성자이므로 new Box()가 8을 저장한다",
          "void Box() 때문에 컴파일할 수 없다",
          "인자 없는 생성자는 없다",
          "new Box()로 생성 직후 n은 0이다"
        ],
        "correct": 3,
        "explanation": "void Box()는 이름이 같아도 일반 메소드다. 실제 생성자를 선언하지 않았으므로 기본 생성자가 제공된다. n은 필드 기본값 0이며 Box() 메소드는 자동 실행되지 않는다.",
        "source": "4장 p.17~23",
        "code": "class Box {\n    int n;\n    void Box() { n=8; }\n}",
        "id": "r2-exam1-q12",
        "number": 12
      },
      {
        "type": "mc",
        "chapter": 4,
        "topic": "접근 지정자",
        "prompt": "서로 다른 패키지의 상속 관계 없는 일반 클래스에서, 접근 가능한 public 클래스의 멤버를 직접 사용하는 경우 가능한 지정자는?",
        "options": [
          "private만",
          "public만",
          "protected와 생략만",
          "모든 지정자"
        ],
        "correct": 1,
        "explanation": "다른 패키지이고 상속 관계도 없으므로 public 멤버만 가능하다. 같은 패키지라는 조건이 없을 때 생략과 protected를 허용하면 안 된다.",
        "source": "4장 p.46~52",
        "code": "",
        "id": "r2-exam1-q13",
        "number": 13
      },
      {
        "type": "mc",
        "chapter": 4,
        "topic": "static 공유",
        "prompt": "다음 코드의 출력 결과는?",
        "options": [
          "1 1",
          "1 2",
          "2 1",
          "2 2"
        ],
        "correct": 2,
        "explanation": "생성자를 두 번 호출하므로 공유 필드 total은 2다. 각 객체의 own은 독립적으로 0에서 1이 된다.",
        "source": "4장 p.53~60",
        "code": "class Counter {\n    static int total; int own;\n    Counter() { total++; own++; }\n}\n// main 안\nCounter a=new Counter(), b=new Counter();\nSystem.out.print(Counter.total+\" \"+a.own);",
        "id": "r2-exam1-q14",
        "number": 14
      },
      {
        "type": "mc",
        "chapter": 4,
        "topic": "GC",
        "prompt": "아래 코드 실행 후 객체에 대한 설명으로 옳은 것은?",
        "options": [
          "첫 객체만 수거 대상이다",
          "두 객체 모두 즉시 삭제된다",
          "b도 새 객체를 가리킨다",
          "두 객체 모두 참조가 남아 있다"
        ],
        "correct": 3,
        "explanation": "처음 객체는 b가, 두 번째 객체는 a가 가리킨다. 변수에 새 객체를 대입해도 기존 객체의 다른 참조가 자동으로 바뀌지 않는다.",
        "source": "4장 p.41~45",
        "code": "Object a=new Object();\nObject b=a;\na=new Object();",
        "id": "r2-exam1-q15",
        "number": 15
      },
      {
        "type": "mc",
        "chapter": 5,
        "topic": "상속 생성자",
        "prompt": "다음 코드의 출력 결과는?",
        "options": [
          "PC",
          "CP",
          "P",
          "컴파일 오류"
        ],
        "correct": 0,
        "explanation": "new Child()에서 먼저 부모 생성자 본문 P, 이어 자식 생성자 본문 C가 실행된다. 생성자를 상속받는 것이 아니라 생성 과정에서 연결 호출한다.",
        "source": "5장 p.13~21",
        "code": "class Parent { Parent(){ System.out.print(\"P\"); } }\nclass Child extends Parent {\n    Child(){ System.out.print(\"C\"); }\n}\n// main 안\nnew Child();",
        "id": "r2-exam1-q16",
        "number": 16
      },
      {
        "type": "mc",
        "chapter": 5,
        "topic": "업캐스팅",
        "prompt": "Parent p=new Child(); 직후 p.childOnly가 오류인 이유는? Child extends Parent이고 childOnly는 Child에만 있는 public 필드이다.",
        "options": [
          "Child 객체가 Parent 객체로 복제되기 때문",
          "업캐스팅하면 자식 필드가 삭제되기 때문",
          "p의 선언 타입 Parent에 해당 필드가 없기 때문",
          "업캐스팅은 항상 실행 중 예외이기 때문"
        ],
        "correct": 2,
        "explanation": "실제 객체는 Child 그대로지만 컴파일 시 멤버 접근은 변수의 선언 타입 Parent에서 검사한다. 객체의 구성과 참조로 보이는 멤버를 구분한다.",
        "source": "5장 p.22~24",
        "code": "",
        "id": "r2-exam1-q17",
        "number": 17
      },
      {
        "type": "mc",
        "chapter": 5,
        "topic": "instanceof",
        "prompt": "다음 코드의 출력 결과는?",
        "options": [
          "true false",
          "true true",
          "false true",
          "false false"
        ],
        "correct": 1,
        "explanation": "Tablet은 Tablet이면서 상위 타입 Device이기도 하다. instanceof는 선언 타입만이 아니라 실제 객체의 상속 관계를 검사한다.",
        "source": "5장 p.27~29",
        "code": "class Device {}\nclass Tablet extends Device {}\n// main 안\nDevice d=new Tablet();\nSystem.out.print((d instanceof Device)+\" \"+(d instanceof Tablet));",
        "id": "r2-exam1-q18",
        "number": 18
      },
      {
        "type": "written",
        "chapter": 3,
        "topic": "배열 참조",
        "prompt": "출력 결과와 그 이유를 쓰시오.",
        "code": "int[] a={4,6};\nint[] b=a;\nb[1]=11;\nb=new int[]{8,9};\nSystem.out.print(a[1]);",
        "accepted": [
          "11"
        ],
        "groups": [
          [
            "참조",
            "reference"
          ],
          [
            "재대입",
            "b만",
            "다른배열",
            "새배열"
          ]
        ],
        "model": "11. 처음에는 참조 값 복사로 a와 b가 같은 배열을 가리켜 원소가 11이 된다. 이후 b 재대입은 b만 새 배열로 바꾸며 a의 연결과 원소 11은 유지된다.",
        "explanation": "11. 처음에는 참조 값 복사로 a와 b가 같은 배열을 가리켜 원소가 11이 된다. 이후 b 재대입은 b만 새 배열로 바꾸며 a의 연결과 원소 11은 유지된다.",
        "source": "3장 p.21; 4장 p.34~41",
        "id": "r2-exam1-q19",
        "number": 19
      },
      {
        "type": "written",
        "chapter": 5,
        "topic": "업캐스팅 오류 판단",
        "prompt": "마지막 문장을 주석 해제하면 컴파일 가능한가? 가능 여부와 이유를 쓰시오.",
        "code": "class Item { int price=100; }\nclass Book extends Item { int pages=250; }\n// main 안\nItem x=new Book();\n// System.out.print(x.pages);",
        "accepted": [
          "불가능",
          "컴파일 불가능",
          "컴파일 오류"
        ],
        "groups": [
          [
            "선언타입",
            "item타입",
            "변수타입"
          ],
          [
            "pages",
            "자식필드"
          ]
        ],
        "model": "컴파일 불가능. x의 선언 타입 Item에는 pages 필드가 없다. 실제 객체가 Book이어도 자식 필드 pages를 상위 타입 참조로 직접 접근할 수 없다.",
        "explanation": "컴파일 불가능. x의 선언 타입 Item에는 pages 필드가 없다. 실제 객체가 Book이어도 자식 필드 pages를 상위 타입 참조로 직접 접근할 수 없다.",
        "source": "5장 p.22~24",
        "id": "r2-exam1-q20",
        "number": 20
      }
    ]
  },
  {
    "id": "r2-exam2",
    "title": "02 · 비슷한 개념 구별하기",
    "subtitle": "예외·접근 범위·this와 super·캐스팅을 비교",
    "questions": [
      {
        "type": "mc",
        "chapter": 1,
        "topic": "JDK·JRE",
        "prompt": "실행 환경만 있던 PC에서 .java를 직접 컴파일하려 한다. 강의의 구분에서 추가로 필요한 구성은?",
        "options": [
          "JIT 없는 JVM",
          "웹 브라우저",
          "소스 주석",
          "javac를 포함한 JDK 개발 도구"
        ],
        "correct": 3,
        "explanation": "JRE는 실행 환경이고 JDK는 javac 같은 개발 도구를 포함한다. 실행할 수 있다는 사실만으로 소스를 컴파일할 수 있는 것은 아니다.",
        "source": "1장 p.14",
        "code": "",
        "id": "r2-exam2-q1",
        "number": 1
      },
      {
        "type": "mc",
        "chapter": 1,
        "topic": "파일 규칙",
        "prompt": "public class Quiz와 일반 최상위 class Helper를 한 소스에 선언했다. 올바른 설명은?",
        "options": [
          "Quiz.java로 저장하며 두 클래스의 .class가 생성된다",
          "Helper.java로만 저장해야 한다",
          "Quiz.class 하나만 생성된다",
          "일반 클래스는 한 파일에 함께 쓸 수 없다"
        ],
        "correct": 0,
        "explanation": "파일 이름은 public 최상위 클래스 Quiz에 맞춘다. 각각 Quiz.class와 Helper.class가 생성되며 public이 아닌 클래스를 함께 둘 수 있다.",
        "source": "1장 p.36~38",
        "code": "",
        "id": "r2-exam2-q2",
        "number": 2
      },
      {
        "type": "mc",
        "chapter": 2,
        "topic": "리터럴",
        "prompt": "다음 중 수정 없이 컴파일 가능한 선언은?",
        "options": [
          "char c=\"K\";",
          "float f=1.25f;",
          "boolean b=0;",
          "int n=null;"
        ],
        "correct": 1,
        "explanation": "f 접미사가 붙어 float 리터럴이므로 올바르다. char는 작은따옴표, boolean은 true/false를 사용하고 int에 null은 불가능하다.",
        "source": "2장 p.12~16",
        "code": "",
        "id": "r2-exam2-q3",
        "number": 3
      },
      {
        "type": "mc",
        "chapter": 2,
        "topic": "var",
        "prompt": "Java 10의 var에 대한 설명으로 옳은 것은?",
        "options": [
          "필드는 초기값 없이 var로 선언한다",
          "한 번 선언하면 어떤 타입이든 대입 가능하다",
          "var n=12;의 n은 int로 결정된다",
          "var n=null;은 Object로 자동 결정된다"
        ],
        "correct": 2,
        "explanation": "var는 초기값을 이용한 지역 변수 타입 추론이다. n은 int이므로 이후 문자열을 대입할 수 없다. 초기값이 없거나 null만 있으면 타입을 추론할 수 없다.",
        "source": "2장 p.17~19",
        "code": "",
        "id": "r2-exam2-q4",
        "number": 4
      },
      {
        "type": "mc",
        "chapter": 2,
        "topic": "단락 평가",
        "prompt": "다음 코드의 출력 결과는?",
        "options": [
          "false 1",
          "false 0",
          "true 1",
          "컴파일 오류"
        ],
        "correct": 1,
        "explanation": "&& 왼쪽이 false이므로 ++n을 평가하지 않는다. 따라서 전체 식은 false이고 n은 0이다. &를 사용하면 오른쪽도 평가한다.",
        "source": "2장 p.34~36",
        "code": "int n=0;\nboolean ok=false && ++n>0;\nSystem.out.print(ok+\" \"+n);",
        "id": "r2-exam2-q5",
        "number": 5
      },
      {
        "type": "mc",
        "chapter": 2,
        "topic": "switch",
        "prompt": "다음 코드의 출력 결과는?",
        "options": [
          "Y",
          "YZ",
          "Z",
          "XYZ"
        ],
        "correct": 1,
        "explanation": "일치하는 case 1에서 Y를 출력하고 break가 없으므로 default의 Z까지 실행한다. default가 있다고 무조건 실행하는 것은 아니며 여기서는 앞에서 흘러 내려온다.",
        "source": "2장 p.45~52",
        "code": "int n=1;\nswitch(n) {\n    case 0: System.out.print(\"X\"); break;\n    case 1: System.out.print(\"Y\");\n    default: System.out.print(\"Z\");\n}",
        "id": "r2-exam2-q6",
        "number": 6
      },
      {
        "type": "mc",
        "chapter": 3,
        "topic": "continue",
        "prompt": "다음 코드의 출력 결과는?",
        "options": [
          "10",
          "9",
          "7",
          "6"
        ],
        "correct": 2,
        "explanation": "i=3일 때만 sum+=i를 건너뛴다. 합은 1+2+4=7이다. continue 이후에도 for의 i++는 실행된다.",
        "source": "3장 p.11~14",
        "code": "int sum=0;\nfor(int i=1;i<=4;i++) {\n    if(i==3) continue;\n    sum+=i;\n}\nSystem.out.print(sum);",
        "id": "r2-exam2-q7",
        "number": 7
      },
      {
        "type": "mc",
        "chapter": 3,
        "topic": "비정방형 배열",
        "prompt": "다음 코드의 출력 결과는?",
        "options": [
          "3 2",
          "2 2",
          "2 3",
          "3 3"
        ],
        "correct": 2,
        "explanation": "a.length는 행 수 2이고 a[1].length는 두 번째 행 원소 수 3이다. 모든 행이 같은 길이일 필요가 없다.",
        "source": "3장 p.26~30",
        "code": "int[][] a={{7},{8,9,10}};\nSystem.out.print(a.length+\" \"+a[1].length);",
        "id": "r2-exam2-q8",
        "number": 8
      },
      {
        "type": "mc",
        "chapter": 3,
        "topic": "예외 잘못 연결",
        "prompt": "발생 상황과 예외 이름의 연결 중 틀린 것은?",
        "options": [
          "null인 배열 참조의 length 접근 → NullPointerException",
          "길이 2 배열의 인덱스 2 접근 → ArrayIndexOutOfBoundsException",
          "실행 중 정수 0으로 나누기 → ArithmeticException",
          "Scanner로 단어를 nextInt()로 읽기 → NumberFormatException"
        ],
        "correct": 3,
        "explanation": "Scanner.nextInt()의 잘못된 토큰은 InputMismatchException이다. 문자열을 Integer.parseInt로 해석할 때의 NumberFormatException과 구별한다.",
        "source": "3장 p.34~40",
        "code": "",
        "id": "r2-exam2-q9",
        "number": 9
      },
      {
        "type": "mc",
        "chapter": 3,
        "topic": "for-each",
        "prompt": "다음 코드 후 a의 원소는?",
        "options": [
          "1, 2",
          "0, 0",
          "1, 0",
          "컴파일 오류"
        ],
        "correct": 0,
        "explanation": "기본 타입 원소 값이 지역 변수 x에 복사된다. x=0은 배열 원소 대입이 아니다. 원소 변경에는 a[i]=0처럼 인덱스로 접근한다.",
        "source": "3장 p.24~25",
        "code": "int[] a={1,2};\nfor(int x:a) x=0;",
        "id": "r2-exam2-q10",
        "number": 10
      },
      {
        "type": "mc",
        "chapter": 4,
        "topic": "this()",
        "prompt": "Java 10에서 다음 생성자에 대한 올바른 판단은?",
        "options": [
          "객체 두 개를 생성한다",
          "정상이며 n은 3이다",
          "this(3)이 첫 문장이 아니라 컴파일 오류다",
          "this는 static 생성자에서만 가능하다"
        ],
        "correct": 2,
        "explanation": "같은 클래스 생성자 호출 this(...)는 강의 Java 10에서 생성자의 첫 문장이어야 한다. println이 먼저라 오류다. this.n과 this(...)는 역할이 다르다.",
        "source": "4장 p.24~28",
        "code": "class Box {\n    int n;\n    Box(){ System.out.print(\"B\"); this(3); }\n    Box(int n){ this.n=n; }\n}",
        "id": "r2-exam2-q11",
        "number": 11
      },
      {
        "type": "mc",
        "chapter": 4,
        "topic": "오버로딩",
        "prompt": "void send(int n, String s)가 있을 때 추가로 선언 가능한 것은? (본문 생략)",
        "options": [
          "int send(int n, String s)",
          "void send(int x, String y)",
          "double send(int v, String text)",
          "void send(String s, int n)"
        ],
        "correct": 3,
        "explanation": "매개변수의 타입 순서가 String,int로 바뀌므로 다른 시그니처다. 나머지는 반환 타입이나 매개변수 이름만 다르므로 중복 선언이다.",
        "source": "4장 p.37~40",
        "code": "",
        "id": "r2-exam2-q12",
        "number": 12
      },
      {
        "type": "mc",
        "chapter": 4,
        "topic": "같은 패키지 접근",
        "prompt": "같은 패키지의 별개 일반 클래스에서 A 객체로 읽을 수 있는 필드 조합은?",
        "options": [
          "a,b,c",
          "b,c,d",
          "a,d",
          "d만"
        ],
        "correct": 1,
        "explanation": "같은 패키지에서는 생략·protected·public에 접근 가능하고 private만 직접 접근 불가다. 상속 여부가 없더라도 같은 패키지 protected 접근은 가능하다.",
        "source": "4장 p.46~52",
        "code": "class A {\n    private int a;\n    int b;\n    protected int c;\n    public int d;\n}",
        "id": "r2-exam2-q13",
        "number": 13
      },
      {
        "type": "mc",
        "chapter": 4,
        "topic": "final 참조",
        "prompt": "다음 중 주석 해제해도 컴파일 가능한 문장은?",
        "options": [
          "A만",
          "B만",
          "둘 다",
          "둘 다 불가능"
        ],
        "correct": 0,
        "explanation": "final은 a에 저장된 참조의 재대입을 막는다. a[0]은 배열 객체 내부의 원소이므로 바꿀 수 있다. final이 객체 전체 불변을 뜻하지 않는다.",
        "source": "4장 p.61~62",
        "code": "final int[] a={2,4};\n// a[0]=7;        // A\n// a=new int[2];  // B",
        "id": "r2-exam2-q14",
        "number": 14
      },
      {
        "type": "mc",
        "chapter": 4,
        "topic": "static 문맥",
        "prompt": "static 메소드에서 인스턴스 필드 value를 읽는 올바른 방법은?",
        "options": [
          "this.value",
          "객체 참조 obj.value",
          "아무 참조 없이 value",
          "static에서는 객체 필드를 어떤 방식으로도 읽을 수 없다"
        ],
        "correct": 1,
        "explanation": "static 문맥에는 현재 객체 this가 없다. 하지만 적절한 객체 참조 obj가 있으면 obj.value로 그 객체의 필드를 읽을 수 있다.",
        "source": "4장 p.57~60",
        "code": "",
        "id": "r2-exam2-q15",
        "number": 15
      },
      {
        "type": "mc",
        "chapter": 5,
        "topic": "상속 접근",
        "prompt": "Child extends Parent이고 Parent에 private int secret과 public int getSecret()이 있다. Child의 인스턴스 메소드에서 가능한 것은?",
        "options": [
          "secret 직접 읽기만 가능",
          "상속하면 private이 public으로 바뀜",
          "접근 가능한 getSecret() 호출",
          "상속 객체에 부모 상태는 존재하지 않음"
        ],
        "correct": 2,
        "explanation": "부모의 private 상태도 객체의 부모 부분에 존재하지만 자식 코드에서 직접 접근하지 못한다. 공개된 부모 메소드를 통해 읽는다.",
        "source": "5장 p.8~12",
        "code": "",
        "id": "r2-exam2-q16",
        "number": 16
      },
      {
        "type": "mc",
        "chapter": 5,
        "topic": "super() 선택",
        "prompt": "Parent(int)만 선언되어 있을 때 Child()에서 올바른 첫 문장은?",
        "options": [
          "super(5);",
          "Parent(5);",
          "this.super(5);",
          "super();"
        ],
        "correct": 0,
        "explanation": "super(5)는 부모의 int 매개변수 생성자를 선택한다. Parent()가 없으므로 super()는 오류이고 일반 메소드처럼 Parent(5)를 부를 수 없다.",
        "source": "5장 p.13~21",
        "code": "",
        "id": "r2-exam2-q17",
        "number": 17
      },
      {
        "type": "mc",
        "chapter": 5,
        "topic": "안전한 다운캐스팅",
        "prompt": "Base p=new Leaf();이고 Leaf extends Base일 때 옳은 설명은?",
        "options": [
          "Leaf x=p;가 자동 변환된다",
          "(Leaf)p는 Base 객체를 새 Leaf로 복제한다",
          "캐스팅하면 생성자를 다시 실행한다",
          "Leaf x=(Leaf)p;로 같은 객체의 자식 멤버에 접근할 수 있다"
        ],
        "correct": 3,
        "explanation": "다운캐스팅은 명시적으로 표기하며 이 경우 실제 객체가 Leaf라 성공한다. 새 객체를 만들거나 생성자를 다시 실행하지 않는다.",
        "source": "5장 p.25~26",
        "code": "",
        "id": "r2-exam2-q18",
        "number": 18
      },
      {
        "type": "written",
        "chapter": 5,
        "topic": "생성자 출력",
        "prompt": "출력 결과와 그 이유를 쓰시오.",
        "code": "class A { A(int n){ System.out.print(n); } }\nclass B extends A {\n    B(){ super(4); System.out.print(\"B\"); }\n}\n// main 안\nnew B();",
        "accepted": [
          "4B",
          "4 B"
        ],
        "groups": [
          [
            "super",
            "상위생성자",
            "부모생성자"
          ],
          [
            "먼저",
            "순서",
            "이후"
          ]
        ],
        "model": "4B. super(4)가 상위 생성자 A(int)를 먼저 실행하여 4를 출력한다. 이후 B 생성자의 나머지 본문이 실행되어 B를 출력한다.",
        "explanation": "4B. super(4)가 상위 생성자 A(int)를 먼저 실행하여 4를 출력한다. 이후 B 생성자의 나머지 본문이 실행되어 B를 출력한다.",
        "source": "5장 p.13~21",
        "id": "r2-exam2-q19",
        "number": 19
      },
      {
        "type": "written",
        "chapter": 5,
        "topic": "상속 오류 판단",
        "prompt": "마지막 문장을 주석 해제하면 컴파일 가능한가? 이유도 쓰시오.",
        "code": "class Parent { private int code=6; }\nclass Child extends Parent {\n    // int read(){ return code; }\n}",
        "accepted": [
          "불가능",
          "컴파일 오류",
          "컴파일 불가능"
        ],
        "groups": [
          [
            "private",
            "비공개"
          ],
          [
            "직접접근",
            "직접읽",
            "접근불가",
            "접근할수없"
          ]
        ],
        "model": "컴파일 불가능. 부모의 code는 private이라 자식 클래스 코드에서 직접 접근할 수 없다. 상속은 private의 접근 제한을 없애지 않는다.",
        "explanation": "컴파일 불가능. 부모의 code는 private이라 자식 클래스 코드에서 직접 접근할 수 없다. 상속은 private의 접근 제한을 없애지 않는다.",
        "source": "5장 p.8~12",
        "id": "r2-exam2-q20",
        "number": 20
      }
    ]
  },
  {
    "id": "r2-exam3",
    "title": "03 · 오류와 실행 흐름",
    "subtitle": "컴파일 오류·실행 중 예외·정상 결과를 구별",
    "questions": [
      {
        "type": "mc",
        "chapter": 1,
        "topic": "JIT",
        "prompt": "javac와 JIT를 구별한 설명으로 맞는 것은?",
        "options": [
          "둘 다 .java를 .class로 바꾸는 명령이다",
          "JIT가 소스 파일 이름을 결정한다",
          "JIT는 프로그램 실행 중 바이트 코드를 기계어로 바꿀 수 있다",
          "javac는 실행 중인 객체만 관리한다"
        ],
        "correct": 2,
        "explanation": "javac는 소스를 바이트 코드로 만드는 컴파일러이고 JIT는 JVM 실행 중 기계어 컴파일로 성능을 높이는 방식이다.",
        "source": "1장 p.12~14, 38~39",
        "code": "",
        "id": "r2-exam3-q1",
        "number": 1
      },
      {
        "type": "mc",
        "chapter": 1,
        "topic": "GC와 실시간",
        "prompt": "GC에 대한 설명 중 틀린 것은?",
        "options": [
          "JVM이 객체 메모리를 자동 관리하는 데 사용한다",
          "System.gc() 호출 직후 모든 가비지 수거 완료가 보장된다",
          "도달할 수 없는 객체는 수거 대상이 될 수 있다",
          "수거 중 정지 때문에 엄격한 응답 시간 보장에 제약이 생길 수 있다"
        ],
        "correct": 1,
        "explanation": "System.gc()는 요청이지 즉시 수거 완료 보장이 아니다. 자동 메모리 관리와 엄격한 실시간 응답 보장은 서로 다른 문제다.",
        "source": "1장 p.38~39; 4장 p.41~45",
        "code": "",
        "id": "r2-exam3-q2",
        "number": 2
      },
      {
        "type": "mc",
        "chapter": 2,
        "topic": "지역 변수 초기화",
        "prompt": "다음 코드의 판단으로 옳은 것은?",
        "options": [
          "컴파일 오류",
          "자동으로 0 출력",
          "실행 중 NullPointerException",
          "쓰레기 값 출력"
        ],
        "correct": 0,
        "explanation": "지역 변수 n은 사용 전에 확정적으로 초기화해야 한다. 필드와 배열 원소의 기본값 0 규칙을 지역 변수에 적용하면 안 된다.",
        "source": "2장 p.8~11",
        "code": "int n;\nSystem.out.print(n);",
        "id": "r2-exam3-q3",
        "number": 3
      },
      {
        "type": "mc",
        "chapter": 2,
        "topic": "정수 승격",
        "prompt": "다음 두 대입문을 각각 따로 판단한 결과로 옳은 것은?",
        "options": [
          "A,B 모두 가능",
          "A만 가능",
          "둘 다 불가능",
          "B만 가능"
        ],
        "correct": 3,
        "explanation": "b+1의 타입은 int라 byte에 그대로 대입할 수 없다. +=는 복합 대입의 변환 규칙이 있어 b+=1은 가능하다.",
        "source": "2장 p.21~23, 31",
        "code": "byte b=3;\n// b=b+1; // A\n// b+=1;  // B",
        "id": "r2-exam3-q4",
        "number": 4
      },
      {
        "type": "mc",
        "chapter": 2,
        "topic": "Scanner 줄 입력",
        "prompt": "입력이 23 뒤 줄바꿈이고 nextInt() 직후 nextLine()을 호출했다. 다음 nextLine()이 빈 문자열이 될 수 있는 이유는?",
        "options": [
          "nextInt()가 Scanner를 닫기 때문",
          "nextLine()은 정수만 읽기 때문",
          "정수 뒤 줄 구분자 앞에 읽을 문자가 없기 때문",
          "nextInt()가 다음 줄까지 모두 지우기 때문"
        ],
        "correct": 2,
        "explanation": "nextInt는 토큰 23을 읽는다. 줄 구분자가 남아 있으면 nextLine은 현재 위치부터 그 구분자 전까지 읽어 빈 문자열을 반환한다.",
        "source": "2장 p.24~28",
        "code": "",
        "id": "r2-exam3-q5",
        "number": 5
      },
      {
        "type": "mc",
        "chapter": 2,
        "topic": "조건식",
        "prompt": "정수 n이 10~20 범위(양끝 포함) 밖인지 검사한 올바른 식은?",
        "options": [
          "n<10 || n>20",
          "n<10 && n>20",
          "10<=n<=20",
          "n=10 || n=20"
        ],
        "correct": 0,
        "explanation": "범위 밖은 아래쪽 또는 위쪽이므로 ||를 쓴다. &&로는 동시에 성립할 수 없고 연쇄 부등식과 대입은 올바른 검사가 아니다.",
        "source": "2장 p.34~44",
        "code": "",
        "id": "r2-exam3-q6",
        "number": 6
      },
      {
        "type": "mc",
        "chapter": 3,
        "topic": "중첩 break",
        "prompt": "다음 코드가 출력하는 별표 개수는?",
        "options": [
          "1",
          "3",
          "6",
          "9"
        ],
        "correct": 1,
        "explanation": "안쪽은 매번 첫 별표 뒤 break로 종료한다. 바깥은 계속 3회 실행되므로 총 3개다. break가 모든 반복을 끝내는 것은 아니다.",
        "source": "3장 p.9~14",
        "code": "for(int i=0;i<3;i++) {\n    for(int j=0;j<3;j++) {\n        System.out.print(\"*\");\n        break;\n    }\n}",
        "id": "r2-exam3-q7",
        "number": 7
      },
      {
        "type": "mc",
        "chapter": 3,
        "topic": "배열 길이 0",
        "prompt": "int[] a=new int[0];에 대한 올바른 판단은?",
        "options": [
          "배열 생성 자체가 항상 오류다",
          "a는 null이다",
          "a.length는 1이다",
          "생성은 가능하고 a[0] 접근은 실행 중 예외다"
        ],
        "correct": 3,
        "explanation": "길이 0 배열도 유효한 배열 객체다. 다만 유효 인덱스가 하나도 없어 a[0]은 ArrayIndexOutOfBoundsException이다.",
        "source": "3장 p.18~23",
        "code": "",
        "id": "r2-exam3-q8",
        "number": 8
      },
      {
        "type": "mc",
        "chapter": 3,
        "topic": "정수 0 나눗셈",
        "prompt": "컴파일은 되지만 실행 중 ArithmeticException이 발생하는 것은?",
        "options": [
          "int z=0; System.out.print(8/z);",
          "System.out.print(8.0/0.0);",
          "System.out.print(8/2);",
          "System.out.print(8%3);"
        ],
        "correct": 0,
        "explanation": "실행 중 int 0으로 나누면 ArithmeticException이다. 실수 8.0/0.0은 Infinity이며 나머지 두 정수 연산은 정상이다.",
        "source": "3장 p.34~40",
        "code": "",
        "id": "r2-exam3-q9",
        "number": 9
      },
      {
        "type": "mc",
        "chapter": 3,
        "topic": "catch 실행",
        "prompt": "다음 코드의 출력 결과는?",
        "options": [
          "NCF",
          "NF",
          "CF",
          "N"
        ],
        "correct": 1,
        "explanation": "try가 정상 종료하므로 N 다음 catch를 건너뛰고 finally F를 실행한다. catch는 예외가 있을 때만 실행한다.",
        "source": "3장 p.34~41",
        "code": "try { System.out.print(\"N\"); }\ncatch(Exception e) { System.out.print(\"C\"); }\nfinally { System.out.print(\"F\"); }",
        "id": "r2-exam3-q10",
        "number": 10
      },
      {
        "type": "mc",
        "chapter": 4,
        "topic": "생성자 자동 제공",
        "prompt": "다음 중 new Note()가 컴파일되지 않는 클래스는? 각 선언은 독립적이다.",
        "options": [
          "class Note {}",
          "class Note { void Note(int x){} }",
          "class Note { Note(int x){} }",
          "class Note { Note(){} Note(int x){} }"
        ],
        "correct": 2,
        "explanation": "세 번째는 실제 매개변수 생성자가 있으므로 Note()가 자동 제공되지 않는다. 두 번째의 void Note(int)는 일반 메소드라 기본 생성자 제공을 막지 않는다.",
        "source": "4장 p.17~23",
        "code": "",
        "id": "r2-exam3-q11",
        "number": 11
      },
      {
        "type": "mc",
        "chapter": 4,
        "topic": "this 필드",
        "prompt": "다음 코드의 출력 결과는?",
        "options": [
          "0",
          "5",
          "10",
          "컴파일 오류"
        ],
        "correct": 1,
        "explanation": "this.value는 객체 필드이고 오른쪽 value는 생성자의 매개변수 5다. 따라서 필드는 5가 된다. this는 별도 객체를 만드는 표현이 아니다.",
        "source": "4장 p.24~28",
        "code": "class Box {\n    int value;\n    Box(int value){ this.value=value; }\n}\n// main 안\nBox b=new Box(5);\nSystem.out.print(b.value);",
        "id": "r2-exam3-q12",
        "number": 12
      },
      {
        "type": "mc",
        "chapter": 4,
        "topic": "객체 배열",
        "prompt": "아래 코드의 첫 실행 중 예외는?",
        "options": [
          "ArrayIndexOutOfBoundsException",
          "ClassCastException",
          "ArithmeticException",
          "NullPointerException"
        ],
        "correct": 3,
        "explanation": "new Box[2]는 Box 참조 배열만 만들고 원소는 null이다. a[0].n은 null의 필드 접근이므로 NullPointerException이다.",
        "source": "4장 p.29~32",
        "code": "class Box { int n; }\n// main 안\nBox[] a=new Box[2];\nSystem.out.print(a[0].n);",
        "id": "r2-exam3-q13",
        "number": 13
      },
      {
        "type": "mc",
        "chapter": 4,
        "topic": "클래스와 인스턴스",
        "prompt": "같은 클래스로 만든 두 객체에 대한 설명 중 옳은 것은?",
        "options": [
          "인스턴스 필드는 각 객체가 독립적으로 가진다",
          "클래스를 선언하면 인스턴스가 반드시 두 개 만들어진다",
          "두 객체는 모든 필드 저장 공간을 항상 공유한다",
          "객체를 만들 때마다 소스 파일도 생성된다"
        ],
        "correct": 0,
        "explanation": "인스턴스 필드는 객체별로 별도 상태를 가진다. 클래스 선언과 객체 생성은 다르고 공유 필드는 static으로 구분한다. 클래스 정보 자체도 메모리를 쓴다.",
        "source": "4장 p.10~16, 53~60",
        "code": "",
        "id": "r2-exam3-q14",
        "number": 14
      },
      {
        "type": "mc",
        "chapter": 4,
        "topic": "가비지 판단",
        "prompt": "다음 세 줄 실행 후 생성했던 객체에 대한 올바른 판단은?",
        "options": [
          "a가 null이면 무조건 수거 대상이다",
          "a가 null이면 b도 null이 된다",
          "b로 접근할 수 있어 아직 수거 대상이 아니다",
          "즉시 메모리에서 삭제된다"
        ],
        "correct": 2,
        "explanation": "객체 수명은 특정 변수 하나가 아니라 남아 있는 도달 경로로 판단한다. b가 같은 객체를 참조하므로 여전히 접근 가능하다.",
        "source": "4장 p.41~45",
        "code": "Object a=new Object();\nObject b=a;\na=null;",
        "id": "r2-exam3-q15",
        "number": 15
      },
      {
        "type": "mc",
        "chapter": 5,
        "topic": "묵시적 super()",
        "prompt": "다음 코드의 판단으로 옳은 것은?",
        "options": [
          "P만 출력",
          "PC 출력",
          "C만 출력",
          "상위의 인자 없는 생성자가 없어 컴파일 오류"
        ],
        "correct": 3,
        "explanation": "C()의 첫 문장에는 묵시적 super()가 들어간다. P(int)만 선언되어 P()가 없으므로 생성자 호출을 해결하지 못한다.",
        "source": "5장 p.13~21",
        "code": "class P { P(int n){ System.out.print(\"P\"); } }\nclass C extends P { C(){ System.out.print(\"C\"); } }",
        "id": "r2-exam3-q16",
        "number": 16
      },
      {
        "type": "mc",
        "chapter": 5,
        "topic": "다운캐스팅 실패",
        "prompt": "아래 마지막 문장의 결과는?",
        "options": [
          "정상이며 새 C 객체 생성",
          "컴파일되지만 ClassCastException",
          "p도 C 객체로 변환",
          "컴파일되지만 NullPointerException"
        ],
        "correct": 1,
        "explanation": "P와 C 사이 상속 관계로 캐스트 문법은 가능하지만 p의 실제 객체는 P다. C로 볼 수 없어 실행 중 ClassCastException이 발생한다.",
        "source": "5장 p.25~29",
        "code": "class P {}\nclass C extends P {}\n// main 안\nP p=new P();\nC c=(C)p;",
        "id": "r2-exam3-q17",
        "number": 17
      },
      {
        "type": "mc",
        "chapter": 5,
        "topic": "instanceof null",
        "prompt": "P p=null;일 때 p instanceof P의 결과는?",
        "options": [
          "false",
          "true",
          "NullPointerException",
          "컴파일 오류"
        ],
        "correct": 0,
        "explanation": "null은 어떤 객체도 가리키지 않으므로 instanceof 결과는 false다. 일반적인 null의 인스턴스 필드 접근과 구분한다.",
        "source": "5장 p.28~29",
        "code": "",
        "id": "r2-exam3-q18",
        "number": 18
      },
      {
        "type": "written",
        "chapter": 3,
        "topic": "중첩 반복 출력",
        "prompt": "출력 문자열과 그 이유를 쓰시오.",
        "code": "for(int i=2;i>=1;i--) {\n    for(int j=0;j<i;j++) System.out.print(\"#\");\n    System.out.print(\"/\");\n}",
        "accepted": [
          "##/#/"
        ],
        "groups": [
          [
            "2",
            "두개"
          ],
          [
            "1",
            "한개"
          ]
        ],
        "model": "##/#/. 바깥 i=2일 때 안쪽이 2회 실행되어 ## 뒤 /를 출력한다. i=1일 때는 1회 실행되어 # 뒤 /를 출력하며 줄바꿈은 없다.",
        "explanation": "##/#/. 바깥 i=2일 때 안쪽이 2회 실행되어 ## 뒤 /를 출력한다. i=1일 때는 1회 실행되어 # 뒤 /를 출력하며 줄바꿈은 없다.",
        "source": "3장 p.9~10",
        "id": "r2-exam3-q19",
        "number": 19
      },
      {
        "type": "written",
        "chapter": 5,
        "topic": "캐스팅 판단",
        "prompt": "마지막 문장 실행은 정상적으로 완료되는가? 가능 여부와 이유를 쓰시오.",
        "code": "class Vehicle {}\nclass Bus extends Vehicle {}\n// main 안\nVehicle v=new Vehicle();\nBus b=(Bus)v;",
        "accepted": [
          "불가능",
          "정상 완료 불가능",
          "ClassCastException"
        ],
        "groups": [
          [
            "실제객체",
            "실제타입"
          ],
          [
            "vehicle",
            "상위객체",
            "부모객체"
          ]
        ],
        "model": "정상 완료 불가능. 컴파일은 가능하지만 실제 객체가 Vehicle이고 Bus 객체가 아니어서 ClassCastException이 발생한다. 명시적 캐스팅으로 실제 객체 타입이 바뀌지 않는다.",
        "explanation": "정상 완료 불가능. 컴파일은 가능하지만 실제 객체가 Vehicle이고 Bus 객체가 아니어서 ClassCastException이 발생한다. 명시적 캐스팅으로 실제 객체 타입이 바뀌지 않는다.",
        "source": "5장 p.25~29",
        "id": "r2-exam3-q20",
        "number": 20
      }
    ]
  },
  {
    "id": "r2-exam4",
    "title": "04 · 시험 직전 종합 점검",
    "subtitle": "후기 빈출 개념과 출력·가능 여부 서술형",
    "questions": [
      {
        "type": "mc",
        "chapter": 1,
        "topic": "실행 과정",
        "prompt": "강의의 클래스 실행 방식에 맞는 순서는?",
        "options": [
          ".java → JVM → javac → .class",
          ".class → javac → .java → CPU",
          ".java → javac → .class → JVM",
          ".java → jar → 기계어 직접 실행"
        ],
        "correct": 2,
        "explanation": "소스 .java를 javac로 컴파일해 바이트 코드 .class를 만들고 JVM이 실행한다. JIT가 사용되더라도 이 기본 흐름과 구분한다.",
        "source": "1장 p.9~14, 24",
        "code": "",
        "id": "r2-exam4-q1",
        "number": 1
      },
      {
        "type": "mc",
        "chapter": 1,
        "topic": "패키지와 모듈",
        "prompt": "java.util.Scanner에서 java.util을 가장 적절하게 설명한 것은?",
        "options": [
          "클래스 이름",
          "패키지 이름",
          "객체 이름",
          "컴파일 명령"
        ],
        "correct": 1,
        "explanation": "java.util은 관련 클래스를 묶는 패키지 이름, Scanner는 클래스 이름이다. 모듈은 패키지와 자원들을 묶는 더 큰 구성 단위다.",
        "source": "1장 p.17~21",
        "code": "",
        "id": "r2-exam4-q2",
        "number": 2
      },
      {
        "type": "mc",
        "chapter": 2,
        "topic": "증감",
        "prompt": "다음 코드의 출력 결과는?",
        "options": [
          "3 3",
          "4 4",
          "3 4",
          "4 3"
        ],
        "correct": 3,
        "explanation": "n++는 기존 값 4를 a에 주고 n을 5로 증가시킨다. 이후 n-=2로 n은 3이다.",
        "source": "2장 p.29~32",
        "code": "int n=4;\nint a=n++;\nn-=2;\nSystem.out.print(a+\" \"+n);",
        "id": "r2-exam4-q3",
        "number": 3
      },
      {
        "type": "mc",
        "chapter": 2,
        "topic": "변환 위치",
        "prompt": "다음 코드의 출력 결과는?",
        "options": [
          "5",
          "6",
          "7",
          "컴파일 오류"
        ],
        "correct": 0,
        "explanation": "(int)3.8은 3, (int)2.7은 2다. 각각 버린 뒤 더하므로 5이며 합 6.5를 나중에 변환하는 식과 다르다.",
        "source": "2장 p.21~23",
        "code": "int n=(int)3.8+(int)2.7;\nSystem.out.print(n);",
        "id": "r2-exam4-q4",
        "number": 4
      },
      {
        "type": "mc",
        "chapter": 2,
        "topic": "비트 연산",
        "prompt": "정수 비트 연산 6 & 3의 결과는?",
        "options": [
          "7",
          "5",
          "2",
          "1"
        ],
        "correct": 2,
        "explanation": "6은 110, 3은 011이므로 AND 결과는 010, 즉 2다. |는 111인 7, ^는 101인 5다.",
        "source": "2장 p.36~38",
        "code": "",
        "id": "r2-exam4-q5",
        "number": 5
      },
      {
        "type": "mc",
        "chapter": 2,
        "topic": "입력 단위",
        "prompt": "기본 구분자 설정에서 입력 한 줄이 Hong Gil Dong이다. sc.next()를 한 번 호출한 결과는?",
        "options": [
          "Hong Gil Dong",
          "Hong",
          "빈 문자열",
          "InputMismatchException"
        ],
        "correct": 1,
        "explanation": "next()는 공백으로 구분되는 한 토큰 Hong을 읽는다. 줄 전체를 원하면 nextLine()이 필요하다.",
        "source": "2장 p.24~28",
        "code": "",
        "id": "r2-exam4-q6",
        "number": 6
      },
      {
        "type": "mc",
        "chapter": 3,
        "topic": "do-while",
        "prompt": "다음 코드의 출력 결과는?",
        "options": [
          "0",
          "1",
          "01",
          "012"
        ],
        "correct": 2,
        "explanation": "본문에서 0을 출력하고 n이 1이 된다. 조건 1<2가 참이라 한 번 더 1을 출력하고 n=2에서 종료한다. 따라서 출력 문자열은 01이다.",
        "source": "3장 p.3~8",
        "code": "int n=0;\ndo {\n    System.out.print(n++);\n} while(n<2);",
        "id": "r2-exam4-q7",
        "number": 7
      },
      {
        "type": "mc",
        "chapter": 3,
        "topic": "배열 선언과 생성",
        "prompt": "int[] a;를 메소드 안에서 선언한 직후에 대한 설명으로 맞는 것은?",
        "options": [
          "정수 배열 원소가 하나 생성된다",
          "a.length는 0이다",
          "a는 자동으로 길이 10 배열을 가리킨다",
          "참조 변수만 선언했으며 배열 객체는 아직 만들지 않았다"
        ],
        "correct": 3,
        "explanation": "선언은 참조 변수를 준비하는 것이고 new int[길이]로 배열을 생성한다. 이 지역 변수 a는 사용 전 값 대입도 필요하다.",
        "source": "3장 p.18~23",
        "code": "",
        "id": "r2-exam4-q8",
        "number": 8
      },
      {
        "type": "mc",
        "chapter": 3,
        "topic": "예외 잘못 연결",
        "prompt": "다음 연결 중 잘못된 것은?",
        "options": [
          "객체 참조를 null로 대입 → 반드시 NullPointerException",
          "배열 범위 밖 접근 → ArrayIndexOutOfBoundsException",
          "정수 0 나눗셈 → ArithmeticException",
          "Scanner 숫자 입력에 단어 → InputMismatchException"
        ],
        "correct": 0,
        "explanation": "null 대입 자체는 합법이다. 이후 그 참조로 인스턴스 멤버나 배열 원소 등에 접근할 때 NullPointerException이 발생한다.",
        "source": "3장 p.34~40",
        "code": "",
        "id": "r2-exam4-q9",
        "number": 9
      },
      {
        "type": "mc",
        "chapter": 3,
        "topic": "배열 평균",
        "prompt": "int[] a={2,3};의 정확한 실수 평균을 계산하는 식은?",
        "options": [
          "(double)((a[0]+a[1])/a.length)",
          "(a[0]+a[1])/a.length",
          "(double)(a[0]+a[1])/a.length",
          "(int)(a[0]+a[1])/(int)a.length"
        ],
        "correct": 2,
        "explanation": "나눗셈 전에 피연산자를 double로 바꾸어야 2.5가 된다. 정수 나눗셈 후 double로 바꾸는 첫 보기는 2.0이다.",
        "source": "3장 p.24~25; 2장 p.21~23",
        "code": "",
        "id": "r2-exam4-q10",
        "number": 10
      },
      {
        "type": "mc",
        "chapter": 4,
        "topic": "생성자 위임",
        "prompt": "다음 코드의 출력 결과는?",
        "options": [
          "0",
          "2",
          "5",
          "컴파일 오류"
        ],
        "correct": 2,
        "explanation": "new Meter()에서 this(2)로 같은 객체의 int 생성자를 호출하여 n=2가 된다. 복귀 후 n+=3으로 5가 된다. 객체를 두 개 만드는 것이 아니다.",
        "source": "4장 p.24~28",
        "code": "class Meter {\n    int n;\n    Meter(){ this(2); n+=3; }\n    Meter(int n){ this.n=n; }\n}\n// main 안\nSystem.out.print(new Meter().n);",
        "id": "r2-exam4-q11",
        "number": 11
      },
      {
        "type": "mc",
        "chapter": 4,
        "topic": "반환 타입과 오버로딩",
        "prompt": "int size(int x)가 있을 때 double size(int y)를 추가할 수 없는 이유는?",
        "options": [
          "메소드 이름에 size를 쓸 수 없어서",
          "매개변수 타입 목록이 같아 구별되지 않아서",
          "int 메소드는 반환값이 없어야 해서",
          "double 메소드는 항상 static이어야 해서"
        ],
        "correct": 1,
        "explanation": "오버로딩은 매개변수의 타입·개수·순서로 구별한다. 반환 타입이나 매개변수 이름만으로 호출을 구별하지 않는다.",
        "source": "4장 p.37~40",
        "code": "",
        "id": "r2-exam4-q12",
        "number": 12
      },
      {
        "type": "mc",
        "chapter": 4,
        "topic": "인자 재대입",
        "prompt": "change 호출 후 a[0]의 값은?",
        "options": [
          "1",
          "5",
          "9",
          "null"
        ],
        "correct": 0,
        "explanation": "매개변수 x는 참조 값의 복사본이다. x를 새 배열로 바꾼 뒤 수정해도 호출자의 a는 원래 배열 {1}을 계속 가리킨다.",
        "source": "4장 p.34~41",
        "code": "static void change(int[] x){\n    x=new int[]{5};\n    x[0]=9;\n}\n// main 안\nint[] a={1};\nchange(a);",
        "id": "r2-exam4-q13",
        "number": 13
      },
      {
        "type": "mc",
        "chapter": 4,
        "topic": "접근 지정자",
        "prompt": "최상위 클래스의 접근 지정자로 사용할 수 있는 조합은?",
        "options": [
          "private 또는 protected",
          "public 또는 private",
          "protected 또는 생략",
          "public 또는 생략"
        ],
        "correct": 3,
        "explanation": "최상위 클래스에는 public 또는 접근 지정자 생략을 쓴다. 멤버의 네 가지 접근 범위와 최상위 클래스에 허용되는 문법을 구분한다.",
        "source": "4장 p.46~52",
        "code": "",
        "id": "r2-exam4-q14",
        "number": 14
      },
      {
        "type": "mc",
        "chapter": 4,
        "topic": "GC 도달 가능성",
        "prompt": "다음 코드 후 수거 대상이 될 수 있는 객체 수는? 다른 참조는 없다.",
        "options": [
          "0개",
          "2개",
          "1개",
          "반드시 즉시 2개 삭제"
        ],
        "correct": 2,
        "explanation": "첫 객체는 a가 null이 되어 더 이상 참조되지 않는다. 두 번째 객체는 c가 가리키므로 b=null이어도 남는다. 수거 대상과 즉시 삭제는 다르다.",
        "source": "4장 p.41~45",
        "code": "Object a=new Object();\nObject b=new Object();\nObject c=b;\na=null;\nb=null;",
        "id": "r2-exam4-q15",
        "number": 15
      },
      {
        "type": "mc",
        "chapter": 5,
        "topic": "다단계 상속",
        "prompt": "class A {}, class B extends A {}, class C extends B {}일 때 C 객체에 대한 옳은 설명은?",
        "options": [
          "A와 B 타입으로도 볼 수 있다",
          "B 타입으로만 볼 수 있다",
          "A 타입 변수로 대입하려면 반드시 명시적 캐스트가 필요하다",
          "클래스 다중 상속이므로 선언 자체가 오류다"
        ],
        "correct": 0,
        "explanation": "C는 B를 직접, A를 간접 상속한다. C 객체는 세 타입에 모두 속하므로 상위 타입으로 자동 업캐스팅 가능하다. 다단계 상속은 여러 클래스를 동시에 직접 상속하는 것과 다르다.",
        "source": "5장 p.5~7, 22~29",
        "code": "",
        "id": "r2-exam4-q16",
        "number": 16
      },
      {
        "type": "mc",
        "chapter": 5,
        "topic": "형제 클래스 instanceof",
        "prompt": "다음 코드의 출력 결과는?",
        "options": [
          "true true",
          "false false",
          "true false",
          "false true"
        ],
        "correct": 3,
        "explanation": "p의 실제 객체는 Teacher로 Person이기도 하다. Student는 형제 클래스라 Teacher 객체는 Student가 아니다.",
        "source": "5장 p.27~29",
        "code": "class Person {}\nclass Student extends Person {}\nclass Teacher extends Person {}\n// main 안\nPerson p=new Teacher();\nSystem.out.print((p instanceof Student)+\" \"+(p instanceof Person));",
        "id": "r2-exam4-q17",
        "number": 17
      },
      {
        "type": "mc",
        "chapter": 5,
        "topic": "상속 구조",
        "prompt": "자바 클래스 상속에 대한 설명으로 옳지 않은 것은?",
        "options": [
          "부모 클래스의 기능을 재사용할 수 있다",
          "한 클래스가 두 클래스를 동시에 직접 extends할 수 있다",
          "부모의 private 멤버를 자식 코드가 직접 읽지는 못한다",
          "생성자 본문은 부모부터 자식 순서로 실행된다"
        ],
        "correct": 1,
        "explanation": "자바 클래스는 하나의 클래스만 직접 상속할 수 있다. extends A,B는 불가능하며 A→B→C의 다단계 상속은 가능하다.",
        "source": "5장 p.3~21",
        "code": "",
        "id": "r2-exam4-q18",
        "number": 18
      },
      {
        "type": "written",
        "chapter": 4,
        "topic": "static·인스턴스 출력",
        "prompt": "출력 결과와 그 이유를 쓰시오.",
        "code": "class Count {\n    static int all; int own;\n    Count(){ all+=2; own++; }\n}\n// main 안\nCount a=new Count();\nCount b=new Count();\nSystem.out.print(Count.all+\" \"+b.own);",
        "accepted": [
          "4 1",
          "4,1"
        ],
        "groups": [
          [
            "static",
            "공유",
            "클래스필드"
          ],
          [
            "독립",
            "각객체",
            "인스턴스"
          ]
        ],
        "model": "4 1. static 필드 all은 공유되어 두 번의 생성에서 2씩 더해져 4가 된다. own은 각 객체의 독립적인 인스턴스 필드이므로 b.own은 1이다.",
        "explanation": "4 1. static 필드 all은 공유되어 두 번의 생성에서 2씩 더해져 4가 된다. own은 각 객체의 독립적인 인스턴스 필드이므로 b.own은 1이다.",
        "source": "4장 p.53~60",
        "id": "r2-exam4-q19",
        "number": 19
      },
      {
        "type": "written",
        "chapter": 5,
        "topic": "업캐스팅 판단",
        "prompt": "마지막 두 문장은 컴파일하고 정상 실행할 수 있는가? 가능 여부와 이유를 쓰시오.",
        "code": "class Food {}\nclass Fruit extends Food { int sugar=8; }\n// main 안\nFood f=new Fruit();\nFruit x=(Fruit)f;\nSystem.out.print(x.sugar);",
        "accepted": [
          "가능",
          "정상 실행 가능",
          "컴파일 가능"
        ],
        "groups": [
          [
            "실제객체",
            "실제타입"
          ],
          [
            "fruit",
            "다운캐스팅"
          ]
        ],
        "model": "가능. f의 선언 타입은 Food지만 실제 객체는 Fruit이다. 명시적 다운캐스팅으로 동일 Fruit 객체를 참조하므로 x.sugar에 접근 가능하며 8을 출력한다.",
        "explanation": "가능. f의 선언 타입은 Food지만 실제 객체는 Fruit이다. 명시적 다운캐스팅으로 동일 Fruit 객체를 참조하므로 x.sugar에 접근 가능하며 8을 출력한다.",
        "source": "5장 p.22~29",
        "id": "r2-exam4-q20",
        "number": 20
      }
    ]
  }
];root.JAVA_EXAMS=exams;if(typeof module!=="undefined")module.exports=exams;})(typeof window!=="undefined"?window:globalThis);
