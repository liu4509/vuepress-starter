# 基础

## 应知

1. java: 可执行的程序就是 JVM 运行 java 程序就是启动 JVM ，让 JVM 执行 javac 编译后以 .class 结尾的字节码文件

2. javac 就是 java 的编译器 把以 .java 结尾的文件 编译为 以 .class为结尾的字节码文件 

3. jar 就是把一组 .class 字节码文件 打包成一个 jar 文件 便于发布

4. javadoc 用于提取 Java 源码里面的注释并生成文件

5. jdb 就是 Java 的调试器

6. **关键字** 必须 **小写**

7. 文件名与类名必须是大写字母开头 可以接 字母 数字 下划线

8. 变量有 基本类型的变量 和 引用类型的变量

9. 基本数据类型 byte short int long float double char boolean 

10. 引用类型 String 

11. 定义 **常量** 加修饰符 final

12. 整型和浮点型运算时，整型会自动提升为浮点型

13. 基本类型的变量是“持有”某个数值，引用类型的变量是“指向”某个对象

14. 栈内存 存储局部变量

15. 堆内存 存储数组和对象 凡是 new 建立的都在堆中

16. 数组常见错误 
    
    > 索引越界异常 (ArrayIndexOutBoundException) 
    
    > > 访问了不存在的索引
    > 
    > 空指针异常 (NullPointerException)
    > 
    > > 数组名已经不指向堆里的地址 还去访问元素

## 方法

17. 方法是将具有独立功能的代码块组织成为一个整体使其具有特定功能的代码集

18. 方法的调用是 **栈** 遵循 **先进后出** 

19. 方法的重载 
    
    1. ☞ 类中方法名相同有多个方法体且参数类型不同或数量加减
    
    2. 通过参数类型与数量判断调用哪个方法体 ☞**与返回值类型无关**

20. 类是一类具有共同属性和行为的事物的抽象

21. 成员变量定义在类里并且不在方法体内 new 后存储在 **堆** 对象销毁后销毁

22. 局部变量定义在方法里 new 后存储在 **栈** 方法销毁后销毁

23. 在同一个作用域中不应有声明相同名称的变量

24. **get** and **set** 方法 可以为成员变量进行权限的控制 确保赋值正确

25. 构造方法 完成对象数据的初始化

26. 封装可控的隐藏对象内部的真实性

27. get and set 方法可以**验证**参数的合法性

## 继承

28. 子类通过 extends 关键字继承

29. 继承提高了代码复用性和维护性

30. this 代表本类对象的引用

31. super 代表父类存储空间的标识

32. 每一个子类构造方法第一句默认都是 super() 
    
    1. 都会调用父类的无参方法
    
    2. 如果没有无参方法 就需要调用有参方法

33. 子类重写父类方法必须**满足**与父类**方法名一致(参数列表一致)**
    
    1. 并在类名上增加注解 @Override 可以检查重写方法声明的正确性

## class 关键字

34. public 作用域为公开

35. private 作用域 仅在本类中访问

36. protected 作用域 通过**继承**可延伸至不同包的子类访问

37. 被 static 修饰 成员方法/变量 被该类的所有对象共享访问

38. static 可以减少代码冗余 多个对象一次性赋值

39. 静态方法块内只能访问静态方法 static 修饰的方法

40. 静态方法内能够访问静态成员属性

41. 通过 final 可以定义常量 其他类通过该类名直接访问
    
    1. 命名常量通常 **全部大写**

42. 在静态方法中调用非静态方法/属性 可以通过 new 出对象.方法

## 多态

43. 多态的基本条件
    
    1. 有继承 or 实现
    
    2. 方法的重写 --- 子类重写父类方法
    
    3. 父类引用 指向 子类对象 --- 动物(父类) 狗(变量) = new 狗(子类继承父类)

44. 多态输出规则
    
    1. 成员属性 --- 编译看左边 执行看左边
    
    2. 成员方法 --- 编译看左边 执行看右边

45. 多态优点与缺点
    
    - 提高程序的扩展性 统一固定的方法可快速插拔
    
    - 同类型的对象拥有同一或多个方法 可以将方法放置于共同父类中 
    
    - 相同方法可通过父类统一调用减少代码冗余 不同的方法需通过自身引用

## 抽象

46. 抽象类于抽象方法
    
    1. 没有方法体的方法应定义为抽象方法
    
    2. 有抽象方法的类应定义为抽象类
    
    3. 通过 abstract 来修饰类与方法
       
       > 抽象类: public abstract class 类名 {}
       > 
       > 抽象方法: public abstract void 方法名()
    
    4. 继承抽象类的子类必须实现父类的所有抽象方法
       
       > 约束子类重写父类抽象方法，补足多态的缺陷
    
    5. 抽象类不一定有抽象方法，但有抽象方法的类必须为抽象类
    
    6. 抽象类不能实例化
    
    7. 抽象类由具体的子类进行实例化
    
    8. 抽象类中可以定义非抽象方法
    
    9. 子类不重写抽象类中的抽象方法，则该类还是抽象类
    
    10. 抽象类中可以有构造方法，用于子类访问父类时的数据初始化
    
    11. abstract 不能与 private final static 共存 有冲突

## 接口

47. 接口是一种公共的规范标准 java 的接口更多体现在对行为的的抽象
    
    1. 接口用关键字 interface 修饰 
       
       ```java
       public interface 接口名 {}
       ```
    
    2. 类实现接口用 implements 表示
       
       ```java
       public class 类 implements 接口名 {} 
       ```
    
    3. 有实现关系 有方法重写 
    
    4. 父类类型指向子类对象
       
       ```java
       Animal animal = new CatImpl ()
       ```
    
    5. 接口的实现类 要么重写接口中所有的抽象方法，要么是抽象类
       
       ```java
       public abstract class DogImpl implements Animal {}
       ```
    
    6. 接口成员变量只能是常量
       
       ```java
       public static final int age = 100;
       ```
    
    7. 成员方法默认是抽象方法， jdk8 后可通过 default 修饰方法定义非抽象方法
       
       ```java
       public abstract eat();
       // jdk8
       public default void show () {
         // 
       }
       ```
    
    8. 接口没有构造方法 因为接口主要对行为进行抽象
    
    9. >  接口与抽象类组合👊🏼
       > 
       > 接口定义行为 🔱
       > 
       > 抽象类继承接口的行为 👇🏼
       > 
       > 更具体的描述对象 
       > 
       > 添加该对象特有的行为和属性☝🏼
       
       > 抽象类是对事物的抽象 包括属性行为 
       > 
       > 接口是对行为的的抽象 主要是行为
       
       > 更多的是嵌套与叠加 为了降低耦合 提高复用性

## 内部类

48. 内部类 
    
    > 成员内部类 和局部内部类 

49. 成员内部类
    
    > 定义在方法外面
    > 
    > 如果加上 static 修饰就是静态内部类
    > 
    > 静态内部类访问外部类的 变量或方法 必需是静态的 反之亦然

50. 局部内部类
    
    > 定义在方法内部

51. 在外界访问 内部类
    
    > 外部类.内部类 变量名 = new 外部类().new 内部类()；
    
    ```java
    MayiktA.MayiktB mayiktB = new MayiktA().new MayiktB();
    ```
    
    > 在实际开发中为了保证数据安全，会更改访问权限 使用 private 修饰

52. 匿名内部类可以实例化 接口 or 抽象类 不需要创建实现类与子类
    
    ```java
    // MayiktB.java
    public interface MayiktB {
      void mayiktB();
    } 
    
    // test.java
    ... main() {
      // 匿名内部类
      MayiktB mayiktB = new MayiktB() {
        // 重写 接口中的方法
        @Override
        public void mayiktB() {
          ...
        }
      }
      mayiktB.mayiktB();
    }
    ```
    
    > 匿名内部类解决了接口与抽象类实现的冗余

## JDK API

53. JDK API  通过文档可以使用由官方封装好的方法

54. Object 是类层次结构的根，所有类都直接或间接的继承 Object 类

55. String.equals() 比较的是两个对象的内存地址是否相同 return Boolean

56. instanceof 比较是否在继承链中
    
    ```java
    实例 instanceof 实例
    return Boolean 
    ```

57. String.replace() 
    
    > 替换指定字符串
    
    ```java
    String.replace("被替换的字符", "替换的字符")
    // 相似的 API 有
    String.replaceAll() // 全部替换
    String.replaceFirst() // 替换第一个
    ```

58. String.split()
    
    > 分割字符串
    
    ```java
    String.split("分割的字符")
    ```

59. String.indexOf()
    
    > 字符串查找
    
    ```java
    String.indexOf("需查找的字符串"，[跳过多少字符(int)] )
    return int // 下标
    未找到返回 -1
    ```

60. 从 JDK9 String的底层实现由 char[] 改成 byte
    
    > 节省 String 占用 jvm 的内存空间

61. 光标放在方法名上通过快捷键 ctrl+alt+v 自动创建符合返回值的类型

62. Math 数学计算类
    
    > 构造函数的访问修饰符是 private 私有的 因此无法实例化 Math
    > 
    > 源码中观察到 Math 类的方法是 static 修饰的 可以通过 
    
    ```java
    Math.adb() 
    // 直接访问
    ```

63. 工具类设计思想
    
    > 重写无参构造函数用 private 修饰 外部无法实例化 无法 new 
    > 
    > 成员方法用 public static 修饰  通过类名访问 类名.方法名

64. 包装类 用于基本数据类型与字符串之间的转化
    
    > 需求 int 的类型范围 int 的包装类是 Integer 
    > 
    > Integer.MAX_VALUE
    > 
    > 推荐 Integer.valueOF( int or string )
    > 
    > 包装类 通过各自的 .valueOF 转换其他类型为自己的类型
    > 
    > 返回类型 int 有直接的方法 Integer.parseInt()

65. 年份 api (Calendar)
    
    > 
    
    ```java
        //    日历类 api 使用
        public static void main(String[] args) {
    // 获取 Calendar 对象
            Calendar c = Calendar.getInstance();
    //        System.out.println("c = "+c); // c = java.util.GregorianCalendar[time=1702999596607,areFieldsS
            c.add(Calendar.YEAR, -22); // 年份修改
            c.set(2008,8,18); // 直接设置时间
            int year = c.get(Calendar.YEAR);
    //        月份从 0 开始 需要加一
            int month = c.get(Calendar.MONTH) + 1;
            int date = c.get(Calendar.DATE);
            System.out.println(year + "年" + month + "月" + date +
         "日"); // 2008年9月18日
        }
    ```

66. 异常
    
    > 异常处理 
    
    ```java
        public static void main(String[] args) {
            try { // 结构体中捕获异常
                a1();
    //        } catch (NullPointerException err) {  捕获指定异常
            } catch (ArrayIndexOutOfBoundsException errArr) { // 可以多次 catch 但子类要在基类前面 不然无法执行到
                System.out.println("数组越界异常:" + errArr.getMessage()); // 当捕获成功 后面的捕获不会执行
                errArr.printStackTrace(); // 控制台打印详细信息
            } catch (Exception err) { // 捕获异常基类 捕获全部异常
                System.out.println("错误:" + err);
            } finally {
                System.out.println("不论成功与否都会执行");
            }
        }
        // 告诉调用者 可能会抛出该异常
        public static void a1() throws ArrayIndexOutOfBoundsException {
            int[] arr1 = {0, 1, 2};
            // 报数组越界异常 ArrayIndexOutOfBoundsException
            System.out.println(arr1[3]);
        }
    ```

67. 编译时异常 
    
    > 必需显示处理

68. 运行时异常
    
    > 不必显示处理 但处理方法与 编译时异常一致

69. 自定义异常
    
    > 向上抛出异常
    
    ```java
    public static void main(String[] args) throws  LoginException{
            throw new LoginException("自定义异常");
    }
    ```
    
    > 自定义异常 是否显示捕获
    
    ```java
    // 运行时异常 不用显示捕获
    public class LoginException extends RuntimeException {
    // 编译时异常 必需显示捕获
    //public class LoginException extends Exception {
        public LoginException(String massage) {
            super(massage);
        }
    }
    ```

## 集合框架

70. 由 JDK 封装好的 API 需注意是 java.util 包下

71. 提供一种存储空间可变的存储模型 存储的数据容量可以发送改变
    
    > 黄色-接口 红色-实现类
    > 
    > ![](C:\Users\26086\AppData\Roaming\marktext\images\2023-12-20-19-52-13-image.png)
    > 
    > |      | 数据是否可重复 |
    > | ---- | ------- |
    > | List | ✔       |
    > | Set  | ❌       |

72. 常见集合框架 数组 链表 树 队列

73. Arraylist  类通过 new 可以实例化 
    
    > 单列 
    > 
    > ```java
    > Collection collection01 = new ArrayList<String>();
    > collection01.add("1111");
    > ```
    > 
    > ![](C:\Users\26086\AppData\Roaming\marktext\images\2023-12-20-20-02-52-image.png)

74. Map() 类通过 new 可以实例化
    
    > 多列
    > 
    > ```java
    > HashMap<String, String> hashMap = new HashMap<>();
    > hashMap.put("index1", "value1");
    > ```
    > 
    > ![](C:\Users\26086\AppData\Roaming\marktext\images\2023-12-20-20-10-51-image.png)
