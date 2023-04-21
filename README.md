# Example Attini project with Typescript CDK

Example project for a CDK project using Attini


## Attini commands
In the below examples we will work with an environment called `dev` and a
distribution called `example-cdk-typescript`.


#### Create an Attini environment

```bash
attini environment create dev
```

#### Package

```bash
attini deploy run . -e dev
```

#### Deploy

```bash
attini deploy run attini_dist/example-cdk-typescript.zip -e dev
```

#### Package and deploy

```bash
attini deploy run . -e dev
```

#### See all your deployments

```bash
attini environment context
```

#### See all your deployments

```bash
attini deploy history -e dev -n example-cdk-typescript
```

#### Rollback

```bash
attini deploy rollback -e dev -n example-cdk-typescript -i {id}
```


## Run tests

```bash
npm test
```
