---
sidebar_position: 2
---

# basic_1

## 入门例子

我发现unity对shader系统有自己的支持。它创建的.shader结尾的文件可以用一种简单的写法来写shader，然后系统会自动将其编译为完整的hlsl的语言。
先看一个简单的例子：
```shaderlab
Shader "Holistic/HelloShader" {
	
	Properties {
	     _myColour ("Example Colour", Color) = (1,1,1,1)
	     _myEmission ("Example Emission", Color) = (1,1,1,1)
		 _myNormal("Example Normal", Color) = (1,1,1,1)

	}
	
	SubShader {
		
		CGPROGRAM
			#pragma surface surf Lambert

			struct Input {
				float2 uvMainTex;
			};

			fixed4 _myColour;
			fixed4 _myEmission;
			fixed4 _myNormal;

			
			void surf (Input IN, inout SurfaceOutput o){
			    o.Albedo = _myColour.rgb;
			    o.Emission = _myEmission.rgb;
				o.Normal = _myNormal.rgb;
			}
		
		ENDCG
	}
	
	FallBack "Diffuse"
}
```
这跟我平时写的hlsl还是差别很大的，我又查了一下，应该是Cg语言，简化了很多写法。

:::tip
GPU编程是对画面中的单个像素编程，但是无法对特定的某一个编程，因为画面中的所有像素都遵循同一套规则与处理方式。
:::

## Properties

Properties是shader与unity交互的部分，定义了shader面板中输入field

```shaderlab
Properties {
        _myColour ("Example Colour", Color) = (1,1,1,1)
        _myEmission ("Example Emission", Color) = (1,1,1,1)
        _myNormal("Example Normal", Color) = (1,1,1,1)

        _myRange("Example Range",Range(0,5))=1

        _myTex("Example Texture", 2D)="white"{}

        _myCube("Example Cube", CUBE)=""{}

        _myFloat("Example Float", Float)=0.5

        _myVector("Example Vector", Vector)=(0.5,1,1,1)
}
```

## structure Input

在structure Input中似乎可以引入从模型，场景端来的数据
```shaderlab
structure Input{
    float2 uv_MainTex;
    float2 uv2_MainTex;
    float3 viewDir;
    float3 worldPos;
    float3 worldRefl;
}
```
- uv_MainTex可以获得模型的uv信息
- viewDir可以获得摄像机的角度
- worldPos可以获得模型在世界坐标系中的位置信息
- worldRef用来计算表面对于环境贴图的反射信息

## SurfaceOutput

在上面的例子中，使用了Lambert作为基础的打底的材质，对于lambort的SurfaceOutput，我们似乎有一些可以调用输出：
```shaderlab
structure SurfaceOutput
{
    fixed3 Albedo;
    fixed3 Normal;
    fixed3 Emission;
    half Specular;
    fiXed Gloss;
    fixed Alpha;
}
```


