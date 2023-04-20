# Example Attini project with Typescript CDK

Example project for a CDK project using Attini


## Attini commands
In the below examples we will work with an environment called `dev` and a
distribution called `example-cdk-python`.


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
attini deploy run attini_dist/example-cdk-python.zip -e dev
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
attini deploy history -e dev -n example-cdk-python
```

#### Rollback

```bash
attini deploy rollback -e dev -n example-cdk-python -i {id}
```


## Run tests

```bash
npm test
```
